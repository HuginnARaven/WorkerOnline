from django.db import models

from users.models import UserAccount
from companies.models import Company, Task, Qualification


class Worker(UserAccount):
    first_name = models.CharField(max_length=100, null=False)
    last_name = models.CharField(max_length=100, null=False)
    working_hours = models.IntegerField(default=0, null=False)
    productivity = models.FloatField(default=1, null=True, blank=True)
    salary = models.IntegerField(default=0, null=False)
    day_start = models.TimeField(null=False)
    day_end = models.TimeField(null=False)

    employer = models.ForeignKey(Company, on_delete=models.CASCADE, null=False)
    qualification = models.ForeignKey(Qualification, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}({self.username})"


class WorkerLogs(models.Model):
    LOG_TYPES = [
        ('TA', 'Task appointed'),
        ('TD', 'Task done'),
        ('OC', 'Out of working place'),
        ('CL', 'Custom log'),
    ]
    date = models.DateField(null=False, auto_now_add=True)
    time = models.TimeField(null=False, auto_now_add=True)
    type = models.CharField(max_length=2, null=False, choices=LOG_TYPES, default='CL')
    description = models.TextField(null=True, blank=True)

    worker = models.ForeignKey(Worker, on_delete=models.CASCADE, null=False)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=False)

    def __str__(self):
        return f"{self.date}({self.time})"


class WorkersTasks(models.Model):
    is_done = models.BooleanField(default=False, null=True, blank=True)
    difficulty_for_worker = models.FloatField(default=1, null=True, blank=True)
    time_start = models.DateTimeField(auto_now_add=True, null=False)
    time_end = models.DateTimeField(null=True, blank=True)

    task_appointed = models.ForeignKey(Task, on_delete=models.CASCADE, null=False)
    worker_appointed = models.ForeignKey(Worker, on_delete=models.CASCADE, null=False)

    def save(self, *args, **kwargs):
        if self.difficulty_for_worker:
            qualification = self.worker_appointed.qualification.modifier
            difficulty = self.task_appointed.difficulty.modifier
            self.difficulty_for_worker = difficulty / qualification
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.task_appointed.title} for {self.worker_appointed.username}"
