from decimal import Decimal
from django.contrib.auth.models import User
from django.db.models import Sum
from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import Product, CartItem, Order, OrderItem, Invoice
from .serializers import (
    RegisterSerializer,
    ProductSerializer,
    CartItemSerializer,
    OrderSerializer,
    InvoiceSerializer,
    UserSerializer,
)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class ProductListView(generics.ListCreateAPIView):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]


class CartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CartItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']
        item, created = CartItem.objects.get_or_create(user=request.user, product=product, defaults={'quantity': quantity})
        if not created:
            item.quantity += quantity
            item.save()
        return Response(CartItemSerializer(item).data, status=status.HTTP_201_CREATED)


class CartItemDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk, user=request.user)
        except CartItem.DoesNotExist:
            return Response({'detail': 'Not found'}, status=404)
        item.quantity = max(1, int(request.data.get('quantity', 1)))
        item.save()
        return Response(CartItemSerializer(item).data)

    def delete(self, request, pk):
        try:
            item = CartItem.objects.get(pk=pk, user=request.user)
        except CartItem.DoesNotExist:
            return Response({'detail': 'Not found'}, status=404)
        item.delete()
        return Response(status=204)


class CheckoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response({'detail': 'Cart is empty'}, status=400)

        subtotal = sum(item.product.price * item.quantity for item in cart_items)
        order = Order.objects.create(
            user=request.user,
            total=subtotal,
            status='paid',
            address=request.data.get('address', ''),
            city=request.data.get('city', ''),
            postal_code=request.data.get('postal_code', ''),
        )
        for item in cart_items:
            OrderItem.objects.create(order=order, product=item.product, quantity=item.quantity, price=item.product.price)
            item.product.stock = max(0, item.product.stock - item.quantity)
            item.product.save()
        invoice_no = f"INV-{order.id:05d}"
        Invoice.objects.create(order=order, invoice_number=invoice_no, amount=subtotal)
        cart_items.delete()
        return Response(OrderSerializer(order).data, status=201)


class MyOrdersView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')


class MyInvoicesView(generics.ListAPIView):
    serializer_class = InvoiceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Invoice.objects.filter(order__user=self.request.user).order_by('-issued_at')


class ProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def admin_metrics(request):
    revenue = Order.objects.aggregate(total=Sum('total'))['total'] or Decimal('0.00')
    data = {
        'users': User.objects.count(),
        'products': Product.objects.count(),
        'orders': Order.objects.count(),
        'revenue': revenue,
    }
    return Response(data)


class AdminUsersView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer
    queryset = User.objects.all().order_by('-id')


class AdminOrdersView(generics.ListAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('-created_at')


class LoginView(TokenObtainPairView):
    pass


@api_view(['POST'])
def seed_products(request):
    if Product.objects.exists():
        return Response({'detail': 'Products already seeded'})
    samples = [
        ('Arctic Luxe Parka', 'Premium down-insulated parka for severe winters.', 'jackets', '299.00', True),
        ('Frost Weave Beanie', 'Soft merino beanie with thermal lining.', 'caps', '49.00', True),
        ('Summit Grip Gloves', 'Waterproof leather gloves with touch support.', 'gloves', '79.00', False),
        ('Snowline Trek Boots', 'All-terrain insulated winter boots.', 'shoes', '189.00', True),
        ('Holiday Velvet Coat', 'Limited seasonal elegant coat.', 'seasonal', '259.00', True),
    ]
    for idx, (name, desc, category, price, featured) in enumerate(samples, start=1):
        Product.objects.create(
            name=name,
            description=desc,
            price=price,
            category=category,
            stock=25 + idx,
            image_url=f'https://picsum.photos/seed/winter{idx}/600/600',
            featured=featured,
        )
    return Response({'detail': 'Seeded'})
