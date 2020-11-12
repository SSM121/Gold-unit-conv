from django.http import JsonResponse
# Create your views here.
from django.shortcuts import render, HttpResponse
from unitconv.models import Conversion
# a flag weather you are going from troy OZ or to troy oz
def equation(flag, t, val):
    c = Conversion.objects.get(start_type=t)
    mod = c.num;
    if flag:
        return val *  mod
    else:
        return val / mod

# Create your views here.
def index(request):
    return HttpResponse("Hello. welcome to unitconv\n" +
            " This is a simple explanation of how to use this api\n" +
            " call this url + /convert/?from=(TYPE)&to=(TYPE)&value=(NUM)\n"+
            " where (NUM) is any floating point number\n" +
            " and (TYPE) is one of the following: \n" +
            " T (Imerpial ton), oz (ounce), lb (imperial pound), kg (kiliogram), g (gram), and t_oz (troy ounce) \n")

def convert(request):
    try:
        f = request.GET['from']
        t = request.GET['to']
        v = request.GET['value']
        Conversion.objects.get(start_type=f)
        Conversion.objects.get(start_type=t)
        v = float(v)
        response = JsonResponse({"units" : t, "value" : equation(False, t, equation(True, f, v))})
    except:
        response = JsonResponse({"error": "Invalid unit conversion request"})
    response['Access-Control-Allow-Origin'] = '*'
    return response;

