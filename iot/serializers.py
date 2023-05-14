from rest_framework import serializers

from iot.models import Supervisor
from workers.models import Worker


class SupervisorOptionsSerializer(serializers.ModelSerializer):
    day_start = serializers.TimeField(source="worker.day_start")
    day_end = serializers.TimeField(source="worker.day_end")
    timezone = serializers.CharField(source="company.timezone")

    class Meta:
        model = Supervisor
        fields = [
            "worker",
            "day_start",
            "day_end",
            "timezone",
            "in_admin_mode",
        ]


class SupervisorCompanySerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(read_only=True)
    last_active = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Supervisor
        fields = [
            "in_admin_mode",
            "worker",
            "is_active",
            "last_active",
        ]

    def validate(self, data):
        if data.get('worker'):
            if not Worker.objects.filter(id=data['worker'].id,
                                         employer=self.context['request'].user.company):
                raise serializers.ValidationError({'detail': [
                    'The assigned worker does not exist or belong to your company!'
                ]})
            if Supervisor.objects.filter(worker=data['worker']):
                raise serializers.ValidationError({'detail': [
                    'The assigned worker already have Supervisor!'
                ]})

        return data

    def create(self, validated_data):
        return Supervisor.objects.create(
            in_admin_mode=validated_data['in_admin_mode'] or False,
            worker=validated_data['worker'] or None,
            company=self.context['request'].user.company,
        )
