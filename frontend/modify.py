# -*- coding: utf-8 -*-
import os
import re

vue_app_openwebui_url = os.getenv('VUE_APP_OPENWEBUI_URL')
backend_url = os.getenv('BACKEND_URL')

file_path = 'vue.config.js'
with open(file_path, 'r') as file:
    content = file.read()

update_needed = False

if vue_app_openwebui_url:
    content = re.sub(
        r"openwebui_url\s*:\s*'.*'",
        "openwebui_url: '{}'".format(vue_app_openwebui_url),
        content
    )
    update_needed = True
else:
    print "VUE_APP_OPENWEBUI_URL environment variable not found."

if backend_url:
    content = re.sub(
        r"backend_url\s*:\s*'.*'",
        "backend_url: '{}'".format(backend_url),
        content
    )
    update_needed = True
else:
    print "BACKEND_URL environment variable not found."

if update_needed:
    with open(file_path, 'w') as file:
        file.write(content)
    print "Successfully updated vue.config.js"
else:
    print "No updates made to vue.config.js"
