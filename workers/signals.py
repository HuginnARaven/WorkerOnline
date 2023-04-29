from django.db.models.signals import post_save, post_delete, post_init
from django.dispatch import receiver
import datetime

from config import settings
from workers.models import WorkersTasks, WorkerLogs, Worker


def get_task_performance(tasks_appointment: WorkersTasks) -> float:
    """
    Function counts performance of worker in completed task
    by calculating time spent on task without overtimes
    and dividing estimate_hours by gotten value
    """
    if tasks_appointment.is_done:
        task_timediff = tasks_appointment.time_end - tasks_appointment.time_start
        days_on_task = tasks_appointment.time_end.day - tasks_appointment.time_start.day
        if tasks_appointment.time_end.day != tasks_appointment.time_start.day:
            worker_day_start = datetime.datetime.combine(datetime.date.today(),
                                                         tasks_appointment.worker_appointed.day_start)
            worker_day_end = datetime.datetime.combine(datetime.date.today(),
                                                       tasks_appointment.worker_appointed.day_end)
            worker_timediff = datetime.timedelta(days=1) - (worker_day_end - worker_day_start)
            task_timediff = task_timediff - (worker_timediff * days_on_task)
            if tasks_appointment.time_end.time() > tasks_appointment.worker_appointed.day_end:
                overtime = datetime.datetime.combine(datetime.date.today(),
                                                     tasks_appointment.time_end.time()) - datetime.datetime.combine(
                    datetime.date.today(), tasks_appointment.worker_appointed.day_end)
                task_timediff = task_timediff - overtime
        elif tasks_appointment.time_end.time() > tasks_appointment.worker_appointed.day_end:
            overtime = datetime.datetime.combine(datetime.date.today(),
                                                 tasks_appointment.time_end.time()) - datetime.datetime.combine(
                datetime.date.today(), tasks_appointment.worker_appointed.day_end)
            task_timediff = task_timediff - overtime

        return tasks_appointment.task_appointed.estimate_hours / (task_timediff.total_seconds() / 3600)


@receiver(post_save, sender=WorkersTasks)
def task_done_log(sender, instance=None, created=True, **kwargs):
    if not created:
        WorkerLogs.objects.create(task=instance.task_appointed,
                                  worker=instance.worker_appointed,
                                  type='TD',
                                  description='Task was done by the worker.')
        worker = Worker.objects.get(id=instance.worker_appointed.id)
        worker.productivity = round(((worker.productivity + get_task_performance(instance)) / 2), 4)
        worker.save(update_fields=["productivity"])
        print(get_task_performance(instance))
