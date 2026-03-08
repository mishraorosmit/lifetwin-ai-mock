from django import forms


class RegistrationForm(forms.Form):
    """Validates the sign-up form submitted by register.html."""

    username = forms.CharField(
        min_length=3,
        max_length=150,
        error_messages={'required': 'Username is required.'},
    )
    email = forms.EmailField(
        error_messages={'required': 'Email is required.'},
    )
    password = forms.CharField(
        min_length=6,
        widget=forms.PasswordInput,
        error_messages={'required': 'Password is required.'},
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput,
        error_messages={'required': 'Please confirm your password.'},
    )

    def clean(self):
        cleaned = super().clean()
        password = cleaned.get('password')
        confirm = cleaned.get('confirm_password')

        if password and confirm and password != confirm:
            raise forms.ValidationError('Passwords do not match.')
        return cleaned


class LoginForm(forms.Form):
    """Validates the login form submitted by login.html."""

    username = forms.CharField(max_length=150)
    password = forms.CharField(widget=forms.PasswordInput)
