"""
first web app using django
"""
from __future__ import absolute_import

from django.http import HttpResponse
from django.template import loader, RequestContext
from django import forms
from django.shortcuts import redirect
from django.utils.deprecation import RemovedInDjango110Warning


class LoginForm(forms.Form):
    username = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput())


def dashboard(request):
    template = loader.get_template("dashboard.html")
    rc = RequestContext(request, {})
    return HttpResponse(template.render(rc))


def index(request):
    # return HttpResponse("Hello, Notes")
    if request.method == "POST":
        print("Request received")
        form = LoginForm(request.POST)
        if form.is_valid():
            print("FORM is valid")
            #user registration or login code
            return redirect("dashboard")
        else:
            print("FORM is invalid")
            template = loader.get_template("index.html")
            rc = RequestContext(request, {'username': 'Kanha', 'form': LoginForm()})
            return HttpResponse(template.render(rc))
    else:
        template = loader.get_template("index.html")
        # rc = RequestContext(request, {'user': request.user})
        rc = RequestContext(request, {'username': 'Kanha', 'form': LoginForm()})
        return HttpResponse(template.render(rc))


def example(request):
    # return HttpResponse("Hello, Notes")
    template = loader.get_template("example.html")
    # rc = RequestContext(request, {'user': request.user})
    rc = RequestContext(request, {'unames': ['Kanha', 'sonu', 'padhi']})
    return HttpResponse(template.render(rc))
