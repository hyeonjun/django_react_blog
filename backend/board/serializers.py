from .models import *
from rest_framework import serializers

class PremiumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Premium
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class PremiumstSerializer(serializers.ModelSerializer):
    class Meta:
        model = Premiumst
        fields = '__all__'

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'