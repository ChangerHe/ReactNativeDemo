#!/bin/sh

#请配置如下打包信息

#项目中文昵称
projectChineseName=优点巴士RN
#项目工程名字
projectName=ReactNativeDemo
#fir.im的Token
firToken=XXXX
#编译条件 Realse Debug 两种
configuration=Realse

echo "请输入此版本更新的内容描述:\n"

read answer

bundle=./ios/bundle

if [ -d "${bundle}" ]; then
rm -rf ${bundle}
fi

mkdir ${bundle}

react-native bundle --platform ios --assets-dest ${bundle} --dev false --entry-file index.js --bundle-output ${bundle}/main.jsbundle

cd ios
#记录一下当前jsbundle路径
jsbundlePath=`pwd`

# xcodebuild clean -workspace ${projectName}.xcworkspace -scheme ${projectName} -configuration ${configuration}
xcodebuild clean -workspace ${projectName}.xcworkspace -scheme ${projectName} -configuration ${configuration}

xcodebuild archive -workspace ${projectName}.xcworkspace -scheme ${projectName}  -configuration ${configuration}  -archivePath ../${projectName}.xcarchive

#创建文件夹
exportPathDir=~/Documents/${projectChineseName}ipa包历史记录

if [ ! -d "${exportPathDir}" ]; then
  mkdir ${exportPathDir}
fi

#根据时间创建对应的文件目录
exportPath=${exportPathDir}/${projectName}-$(date "+%Y-%m-%d日%H:%M:%S")

if [ ! -d "${exportPath}" ]; then
  mkdir ${exportPath}
fi

xcodebuild -exportArchive -archivePath ../${projectName}.xcarchive -exportOptionsPlist ../AdHocOptions.plist -exportPath "${exportPath}"

cd ${exportPath}

#登录fir.im
fir login -T ${firToken}

#发布到fir.im
fir publish ${projectName}.ipa -Q --changelog="本次修改描述:  $answer "

#压缩拷贝jsbundle到文件目录中去
cd ${jsbundlePath}
zipFile=${projectName}_iOS_jsbundle.zip
zip -r ${zipFile} bundle
mv ${zipFile} ${exportPath}

#保留xcarchive文件
cd ${jsbundlePath}
cd ..
mv ./${projectName}.xcarchive ${exportPath}
cd ${exportPath}
fir info ${projectName}.ipa > logfile.txt

echo  "本版本更新描述:  $answer " >> logfile.txt
echo "     🤡自动打包并上传fir.im成功~~~🤡"
open .