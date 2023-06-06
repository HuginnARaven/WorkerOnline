from django import forms
from django.conf import settings
from .utils import backup_database, backup_media


class DatabaseBackupForm(forms.Form):
    database = forms.ChoiceField(
        label='Pick a database to backup',
        choices=zip(
            settings.DATABASES.keys(),
            settings.DATABASES.keys()
        )
    )

    def do_backup(self):
        return backup_database(self.cleaned_data['database'])

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'form-control select2-hidden-accessible'
