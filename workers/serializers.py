from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

from workers.models import Worker


class WorkerSerializer(serializers.ModelSerializer):
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True, validators=[validate_password])
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = Worker
        fields = [
            'username',
            'email',
            'password',
            'password2',
            'first_name',
            'last_name',
            'qualification',
        ]

    def create(self, validated_data):
        password = validated_data['password']
        password2 = validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'detail': ['Password do not match!']})
        if self.context['request'].user.company != validated_data['qualification'].company:
            raise serializers.ValidationError({'detail': ['You cannot use another company`s qualifications!']})
        return Worker.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            password=make_password(password),
            role='W',
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            employer=self.context['request'].user.company,
            qualification=validated_data['qualification'],
        )
