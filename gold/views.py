from django.shortcuts import render, HttpResponse
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.urls import reverse
# Create your views here.
def index(request):
    context = {}
    return render(request, 'gold/index.html', context)
