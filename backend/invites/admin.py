from django.contrib import admin
from .models import ParentInvite


@admin.register(ParentInvite)
class ParentInviteAdmin(admin.ModelAdmin):
    list_display = ('child', 'token', 'used', 'expires_at', 'created_at')
    readonly_fields = ('token', 'created_at', 'expires_at')
    list_filter = ('used',)
    search_fields = ('child__first_name', 'child__last_name', 'email', 'phone')