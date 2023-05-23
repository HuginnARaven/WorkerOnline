from django.contrib import admin
from django import forms
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _
from import_export.admin import ExportActionMixin, ExportActionModelAdmin

from workers.models import Worker, WorkerLogs, TaskAppointment, WorkerTaskComment, WorkerSchedule


class WorkerAdminForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['role'].disabled = True
        self.fields['role'].initial = 'W'

    def clean(self):
        cleaned_data = super().clean()

        if cleaned_data.get("qualification").company != cleaned_data.get("employer"):
            raise forms.ValidationError(_('Matching error, you are probably trying to set one company and the qualifications of another!'))

        # raw_password = cleaned_data.get('password')
        # cleaned_data['password'] = make_password(raw_password)

        return cleaned_data

    class Meta:
        model = Worker
        fields = '__all__'


class WorkerAdmin(ExportActionMixin, admin.ModelAdmin):
    form = WorkerAdminForm


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


admin.site.register(Worker, WorkerAdmin)
admin.site.register(WorkerLogs, ExportActionModelAdmin)
admin.site.register(TaskAppointment, WorkersTasksAdmin)
admin.site.register(WorkerTaskComment)
admin.site.register(WorkerSchedule)

