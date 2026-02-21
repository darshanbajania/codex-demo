from django.urls import path
from .views import (
    RegisterView, LoginView, ProductListView, ProductDetailView,
    CartView, CartItemDetailView, CheckoutView, MyOrdersView, MyInvoicesView,
    ProfileView, admin_metrics, AdminUsersView, AdminOrdersView, seed_products
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('products/', ProductListView.as_view()),
    path('products/<int:pk>/', ProductDetailView.as_view()),
    path('cart/', CartView.as_view()),
    path('cart/<int:pk>/', CartItemDetailView.as_view()),
    path('checkout/', CheckoutView.as_view()),
    path('orders/me/', MyOrdersView.as_view()),
    path('invoices/me/', MyInvoicesView.as_view()),
    path('admin/metrics/', admin_metrics),
    path('admin/users/', AdminUsersView.as_view()),
    path('admin/orders/', AdminOrdersView.as_view()),
    path('seed/', seed_products),
]
