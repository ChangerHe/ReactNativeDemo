#!/bin/bash

# Copyright 2016 Facebook, Inc.
#
# You are hereby granted a non-exclusive, worldwide, royalty-free license to
# use, copy, modify, and distribute this software in source code or binary
# form for use in connection with the web services and APIs provided by
# Facebook.
#
# As with any software that integrates with the Facebook platform, your use
# of this software is subject to the Facebook Developer Principles and
# Policies [http://developers.facebook.com/policy/]. This copyright notice
# shall be included in all copies or substantial portions of the software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
# FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
# DEALINGS IN THE SOFTWARE

ERROR=0

yarn lint --max-warnings 0

if [ $? -ne 0 ]
then
  cat <<EOF

  We've noticed there are lint warnings in the codebase (see above).
  Please run

    $ yarn lint

  and fix the warnings. Don't forget to amend your changes before pushing!

  HINT:
    If you see warnings from prettier, you can auto-fix them by
    running 'yarn lint --fix'.

EOF
  ERROR=1
fi

yarn flow

if [ $? -ne 0 ]
then
  cat <<EOF

  We've noticed there are Flow errors in the codebase (see above).
  Please run

    $ yarn flow

  and fix the errors. Don't forget to amend your changes before pushing!

EOF
  ERROR=1
fi

yarn test

if [ $? -ne 0 ]
then
  cat <<EOF

  We've noticed there are test errors in the codebase (see above).
  Please run

    $ yarn test

  and fix the errors. Don't forget to amend your changes before pushing!

EOF
  ERROR=1
fi

exit $ERROR
