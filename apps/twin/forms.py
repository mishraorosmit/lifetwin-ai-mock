from django import forms
from .models import DigitalTwin


class DigitalTwinForm(forms.ModelForm):
    """
    Maps directly to the create_twin.html multi-step form.
    All field names match the HTML `name` attributes.
    """

    class Meta:
        model = DigitalTwin
        fields = [
            'age', 'gender', 'height', 'weight',
            'sleep_hours', 'exercise_days', 'water_intake',
            'stress_level', 'screen_time', 'diet',
        ]
        widgets = {
            'age': forms.NumberInput(attrs={'min': 10, 'max': 100}),
            'gender': forms.RadioSelect,
            'height': forms.NumberInput(attrs={'min': 100, 'max': 250}),
            'weight': forms.NumberInput(attrs={'min': 30, 'max': 300}),
            'sleep_hours': forms.NumberInput(attrs={'min': 3, 'max': 12}),
            'exercise_days': forms.NumberInput(attrs={'min': 0, 'max': 7}),
            'water_intake': forms.NumberInput(attrs={'min': 1, 'max': 15}),
            'stress_level': forms.NumberInput(attrs={'min': 1, 'max': 10}),
            'screen_time': forms.NumberInput(attrs={'min': 0, 'max': 16}),
            'diet': forms.RadioSelect,
        }
