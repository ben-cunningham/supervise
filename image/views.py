from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from boto.s3.connection import S3Connection
from boto.s3.key import Key

def upload_to_s3(photo):
    conn = S3Connection('AKIAJZQVCTLVY62PZFWA', 'sGYowsWEG1GjVrauFoYxzq6uwf69Qwg/q2RHdc5r')
    bucket = conn.get_bucket('bencunninghambuckettest')
    k = Key(bucket)
    k.key = photo.name
    k.set_contents_from_file(photo)
    url = k.generate_url(expires_in=0, query_auth=False)
    return url

def hash_name(name):
    return ''

class ImageUpload(APIView):
    def post(self, request, format=None):
        files = self.request.FILES.getlist('key[0]')
        urls = []
        for f in files:
            urls.append(upload_to_s3(f))

        content = {
            'urls': [u for u in urls]
        }

        return Response(content, status=status.HTTP_201_CREATED)

class ThumbnailUpload(APIView):

    def post(self, request, format=None):
        print self.request.FILES
        image = self.request.FILES.get('image')
        url = upload_to_s3(image)
        content = {
            'thumbnail': url
        }

        return Response(content, status=status.HTTP_201_CREATED)