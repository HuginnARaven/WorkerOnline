from django.contrib import admin
from django import forms
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _
from import_export.admin import ExportActionMixin, ExportActionModelAdmin

from workers.models import Worker, WorkerLogs, TaskAppointment, WorkerTaskComment, WorkerSchedule, TaskVote


class WorkerAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['role'].initial = 'W'
        self.fields['role'].disabled = True
        self.fields['role'].required = False
        instance = getattr(self, 'instance', None)
        if instance and instance.pk:
            self.fields['password'].disabled = True
            self.fields['password'].required = False

    def clean(self):
        cleaned_data = super().clean()

        if cleaned_data.get("qualification").company != cleaned_data.get("employer"):
            raise forms.ValidationError(
                _('Matching error, you are probably trying to set one company and the qualifications of another!')
            )

        return cleaned_data

    class Meta:
        model = Worker
        fields = '__all__'


class WorkerAdmin(ExportActionMixin, admin.ModelAdmin):
    form = WorkerAdminForm

    def save_model(self, request, obj, form, change):
        if not change:
            obj.password = make_password(obj.password)

        super().save_model(request, obj, form, change)


class WorkersTasksAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["time_end"].is_required = False
        self.fields['difficulty_for_worker'].disabled = True

    def clean(self):
        cleaned_data = super().clean()

        if cleaned_data.get("task_appointed").company != cleaned_data.get("worker_appointed").employer:
            raise forms.ValidationError(_('Matching error, you are probably trying to set task from one company and the worker of another!'))

        return cleaned_data

    class Meta:
        model = TaskAppointment
        fields = '__all__'


class WorkersTasksAdmin(ExportActionModelAdmin, admin.ModelAdmin):
    form = WorkersTasksAdminForm


class TaskCommentsAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["user"].is_required = False
        self.fields["user"].disabled = True
        self.fields["task_appointment"].is_required = False
        self.fields["task_appointment"].disabled = True

    class Meta:
        model = TaskAppointment
        fields = '__all__'


class TaskCommentsAdmin(ExportActionModelAdmin, admin.ModelAdmin):
    form = TaskCommentsAdminForm


admin.site.register(Worker, WorkerAdmin)
admin.site.register(WorkerLogs, ExportActionModelAdmin)
admin.site.register(TaskAppointment, WorkersTasksAdmin)
admin.site.register(WorkerTaskComment, TaskCommentsAdmin)
admin.site.register(WorkerSchedule)
admin.site.register(TaskVote)

