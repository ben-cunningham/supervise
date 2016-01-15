from django.db import models
from main.models import Team
import sendgrid
import random
import string

sg = sendgrid.SendGridClient('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')

class Invitation(models.Model):
    email = models.EmailField()
    uid = models.CharField(max_length=6)
    team = models.ForeignKey(Team, null=True, related_name='invitations')

    @classmethod
    def create(cls, email, team):
        if email is None:
            # TODO: Error checking might not be needed...
            print("email needed")
        else:
            invite = cls(email=email, team=team)
            return invite

    def generate_url(self):
        uid = ''.join(random.choice(string.ascii_lowercase + string.ascii_uppercase + string.digits) for _ in range(6))
        setattr(self, 'uid', uid)
        return uid

    def send(self):
        message = sendgrid.Mail()
        message.add_to(self.email)
        message.set_from('bgc_17@hotmail.com')
        message.set_html(' ')
        message.set_text(' ')
        message.set_subject(' ')
        message.add_filter('templates', 'enable', '1')
        message.add_filter('templates', 'template_id', '1d3fa762-48d2-45ab-8bca-49c3299700b6')
        message.add_substitution('<%subject%>', 'Invitation')
        message.add_substitution(':invitation_link', self.generate_url())
        message.add_substitution('<%%body%%>', '')
        status, msg = sg.send(message)
        #TODO: add error handling here
        # print(msg)
