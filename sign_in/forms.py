from django import forms

class LoginForm(forms.Form):
    username = forms.CharField(max_length=128)
    password = forms.CharField(max_length=128)

# class SignUp(forms.ModelForm):
# 	title = forms.CharField(max_length=128)
#
# 	class Meta:
# 		model = mdoels.Organization
# 		fields = ('title', 'description', 'number_of_semesters',)
# 		exclude = ('house', 'images', 'user_profile')
# 		widgets = {
# 		'title' : forms.TextInput(attrs={'class': 'input-field'})
# 		}
