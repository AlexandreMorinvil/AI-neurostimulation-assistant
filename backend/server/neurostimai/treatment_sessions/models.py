from django.db import models

class Patient(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    identifier = models.CharField(max_length=50)

class TreatmentSession(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    patient_identifier = models.ForeignKey(Patient, on_delete=models.CASCADE)