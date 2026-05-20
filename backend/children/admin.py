from django.contrib import admin
from .models import Child, ChildParentRelation


admin.site.register(Child)

@admin.register(ChildParentRelation)
class ChildParentRelationAdmin(admin.ModelAdmin):
    list_display = ['parent', 'parent_email', 'child', 'relation_type', 'created_at']
    list_filter = ['relation_type']

    def parent_email(self, obj):
        return obj.parent.email
    parent_email.short_description = 'Email родителя'