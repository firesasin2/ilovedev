"use strict";(self.webpackChunkACRA_Point_V3_Education=self.webpackChunkACRA_Point_V3_Education||[]).push([[5578],{2320:(n,l,i)=>{i.r(l),i.d(l,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>d});var e=i(5893),r=i(1151);const s={},c="\ube4c\ub4dc",a={type:"mdx",permalink:"/ilovedev/go/make",source:"@site/src/pages/go/make.md",title:"\ube4c\ub4dc",description:"\ube4c\ub4dc\ud558\uae30",frontMatter:{},unlisted:!1},o={},d=[{value:"\ube4c\ub4dc\ud558\uae30",id:"\ube4c\ub4dc\ud558\uae30",level:3},{value:"wauth\uc758 make",id:"wauth\uc758-make",level:3},{value:"strip",id:"strip",level:3},{value:"go vet",id:"go-vet",level:3},{value:"go test",id:"go-test",level:3}];function t(n){const l={code:"code",h1:"h1",h3:"h3",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(l.h1,{id:"\ube4c\ub4dc",children:"\ube4c\ub4dc"}),"\n",(0,e.jsx)("br",{}),"\n",(0,e.jsx)(l.h3,{id:"\ube4c\ub4dc\ud558\uae30",children:"\ube4c\ub4dc\ud558\uae30"}),"\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"Go \uc5b8\uc5b4\uc5d0\uc11c\uc758 \ube4c\ub4dc \ud504\ub85c\uc138\uc2a4\ub294 \uac04\ub2e8\ud558\uace0 \ud6a8\uc728\uc801"}),"\n",(0,e.jsx)(l.li,{children:"Go\ub294 \uc815\uc801 \ubc14\uc774\ub108\ub9ac\ub97c \uc0dd\uc131\ud558\ubbc0\ub85c \uc678\ubd80 \uc885\uc18d\uc131\uc774 \uc5c6\ub294 \uc2e4\ud589 \uac00\ub2a5\ud55c \ud30c\uc77c\uc744 \ub9cc\ub4e4 \uc218 \uc788\uc74c"}),"\n",(0,e.jsxs)(l.li,{children:["\uae30\ubcf8 \ube4c\ub4dc","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsxs)(l.li,{children:["main.go \ud30c\uc77c\uc774 \uc788\ub294 \uacf3\uc5d0\uc11c \uc544\ub798\uc758 \uba85\ub839\uc5b4\ub97c \ud0c0\uc774\ud551","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{className:"language-bash",children:"go build // \ubc14\uc774\ub108\ub9ac \ud30c\uc77c\uc758 \uc774\ub984\uc740 \ud604\uc7ac \ub514\ub809\ud1a0\ub9ac\uc758 \uc774\ub984\uacfc \ub3d9\uc77c\ud558\uac8c \uc124\uc815\ub428\n"})}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["\uc2e4\ud589 \ud30c\uc77c \uc774\ub984\uc8fc\uae30","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{className:"language-bash",children:"go build -o wauth\n"})}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["\uc989\uc2dc \uc2e4\ud589\ud558\uae30 (\uc2e4\ud589 \ud6c4 \uc784\uc2dc \ud30c\uc77c\uc740 \uc0ad\uc81c\ub428)","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{className:"language-bash",children:"go run main.go\n"})}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["\ud06c\ub85c\uc2a4 \ud50c\ub7ab\ud3fc \ucef4\ud30c\uc77c (\ub9ac\ub205\uc2a4\uc5d0\uc11c Windows \ubc14\uc774\ub108\ub9ac\ub97c \ub9cc\ub4e4 \uc218 \uc788\uc74c, \ubc18\ub300\ub3c4 \uac00\ub2a5)","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{className:"language-go",children:"GOOS=windows GOARCH=amd64 go build -o output.exe\n"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,e.jsx)(l.li,{children:"Go\ub294 \uc758\uc874\uc131\uc744 \uc790\ub3d9\uc73c\ub85c \ucc98\ub9ac\ud558\ubbc0\ub85c \ubaa8\ub4e0 \ud544\uc694\ud55c \ud328\ud0a4\uc9c0 \ubc0f \ud30c\uc77c\uc744 \ucc3e\uc544 \ucef4\ud30c\uc77c\ud568"}),"\n"]}),"\n",(0,e.jsx)("br",{}),"\n",(0,e.jsx)(l.h3,{id:"wauth\uc758-make",children:"wauth\uc758 make"}),"\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsxs)(l.li,{children:["makefile","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{className:"language-makefile",children:'export WAX_RELEASE  // \ubc30\ud3ec \ubc84\uc804\r\nexport WAX_DATETIME // \ubc30\ud3ec \ub0a0\uc9dc\r\nexport WAX_MODE     // BASE\uc778\uc9c0 CC\uc778\uc9c0\r\n\r\nLDFLAGS="-X main.Version=${WAX_VERSION} -X main.Build=${WAX_RELEASE}${WAX_DATETIME} -X main.MODE=${WAX_MODE} -w -s"\r\nexport LDFLAGS\r\n\r\nall : wauth\r\n\r\nclean :\r\n        @rm -f ./wauth\r\n        @rm -f ./bin/*\r\n        $(MAKE) -C liboffline clean\r\n        $(MAKE) -C libonline clean\r\n        $(MAKE) -C libapplication clean\r\n        $(MAKE) -C libpki clean\r\n\r\ninstall :\r\n        @if [ ! -d ./bin ];then mkdir ./bin;fi\r\n        @mv ./wauth ./bin/wauth\r\n        @mv ./libonline/libonline.so ./bin/libonline.so\r\n        @mv ./liboffline/liboffline.so ./bin/liboffline.so\r\n        @mv ./libapplication/libapplication.so ./bin/libapplication.so\r\n        @mv ./libpki/libpki.so ./bin/libpki.so\r\n        @mv ./libpki/dspki.tar ./bin/dspki.tar\r\n        @../xgencrc32/bin/xgencrc32 ./bin/wauth\r\n        @../xgencrc32/bin/xgencrc32 ./bin/libonline.so\r\n        @../xgencrc32/bin/xgencrc32 ./bin/liboffline.so\r\n        @../xgencrc32/bin/xgencrc32 ./bin/libapplication.so\r\n        @../xgencrc32/bin/xgencrc32 ./bin/libpki.so\r\n\r\nwauth : ./*.go ./*/*.go\r\n        go vet\r\n        go build -ldflags ${LDFLAGS} -o wauth\r\n        strip ./wauth\r\n        $(MAKE) -C liboffline all\r\n        $(MAKE) -C libonline all\r\n        $(MAKE) -C libapplication all\r\n        $(MAKE) -C libpki all\r\n\r\nswagger : ./*.go ./*/*.go\r\n        swag init --parseVendor --parseDependency\r\n        go build -ldflags ${LDFLAGS} -o wauth\r\n        strip ./wauth\r\n        $(MAKE) -C liboffline all\r\n        $(MAKE) -C libonline all\r\n        $(MAKE) -C libapplication all\r\n        $(MAKE) -C libpki all\r\n\r\npush :\r\n        @git push origin --all\n'})}),"\n"]}),"\n",(0,e.jsx)(l.li,{children:"make all\r\nmake wauth\ub97c \uc2e4\ud589\uc2dc\ud0b4"}),"\n",(0,e.jsxs)(l.li,{children:["make wauth","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"make\uc2dc \ub610\ub294 make -B\uc2dc \ub610\ub294 make all\uc2dc \ub610\ub294 make auth\uc2dc \ub3d9\uc791"}),"\n",(0,e.jsx)(l.li,{children:"wauth \ube4c\ub4dc \uba85\ub839\uc5b4"}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["make install","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"\ube4c\ub4dc\ub41c wauth \ud30c\uc77c\ub4e4\uc744 \uc774\ub3d9\uc2dc\ud0a4\uace0, xgencrc32 \uba85\ub839\uc5b4\ub85c \ud574\ub2f9 \ud30c\uc77c\uc5d0 \ud574\uc2dc\uac12\uc744 \ub354\ud568"}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["make clean","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"\ube4c\ub4dc\ub41c wauth \ud30c\uc77c\ub4e4 \uc0ad\uc81c"}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["LDFLAGS","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"Go \uc5b8\uc5b4\uc758 \ube4c\ub4dc \ud504\ub85c\uc138\uc2a4\uc5d0\uc11c \uc0ac\uc6a9\ub418\ub294 \ub9c1\ucee4 \ud50c\ub798\uadf8"}),"\n",(0,e.jsxs)(l.li,{children:["\ube4c\ub4dc\ub41c \ud504\ub85c\uadf8\ub7a8\uc5d0 \ub300\ud55c \ub9c1\ucee4 \ub3d9\uc791\uc744 \uc81c\uc5b4\ud558\ub294 \ub370 \uc0ac\uc6a9 (LDFLAGS\ub97c \uc0ac\uc6a9\ud558\uc5ec \uc5ec\ub7ec \uc124\uc815\uc774\ub098 \ub77c\uc774\ube0c\ub7ec\ub9ac \uacbd\ub85c \ub4f1\uc744 \ub9c1\ucee4\uc5d0\uac8c \uc804\ub2ec\ud560 \uc218 \uc788\uc74c)","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsxs)(l.li,{children:["\ub9c1\ucee4 \ud50c\ub798\uadf8\ub85c \uc0ac\uc6a9","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{className:"language-makefile",children:'go build -ldflags="-s -w"\n'})}),"\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"-s\ub294 \uc2ec\ubcfc \uc815\ubcf4\ub97c \uc0ad\uc81c\ud568"}),"\n",(0,e.jsx)(l.li,{children:"-w\ub294 \ub514\ubc84\uadf8 \uc815\ubcf4\ub97c \uc0ad\uc81c\ud568"}),"\n"]}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["\ub77c\uc774\ube0c\ub7ec\ub9ac\uc758 \uacbd\ub85c\ub97c \uc9c0\uc815 (\uc678\ubd80 \ub77c\uc774\ube0c\ub7ec\ub9ac\ub97c \uc0ac\uc6a9)","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{className:"language-makefile",children:'go build -ldflags="-L /path/to/library"\n'})}),"\n"]}),"\n",(0,e.jsxs)(l.li,{children:["\ud2b9\uc815 \ubcc0\uc218 \uac12\uc744 \uc804\ub2ec","\n",(0,e.jsx)(l.pre,{children:(0,e.jsx)(l.code,{children:'go build -ldflags="-X main.version=1.0.0"\n'})}),"\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:'main \ud328\ud0a4\uc9c0\uc758 version \ubcc0\uc218\uc758 \uac12\uc744 "1.0.0"\uc73c\ub85c \uc124\uc815\ud560 \uc218 \uc788\uc74c'}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,e.jsx)("br",{}),"\n",(0,e.jsx)(l.h3,{id:"strip",children:"strip"}),"\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"\uc624\ube0c\uc81d\ud2b8 \ud30c\uc77c\uc5d0 \uc788\ub294 \uc2ec\ubcfc\uc744 \uc0ad\uc81c"}),"\n",(0,e.jsx)(l.li,{children:"strip -s \ud30c\uc77c\uc774\ub984: \ubaa8\ub4e0 \uc2ec\ubcfc\uc744 \uc81c\uac70"}),"\n",(0,e.jsx)(l.li,{children:"strip -g \ud30c\uc77c\uc774\ub984: \ub514\ubc84\uadf8 \uc2ec\ubcfc\uc744 \uc81c\uac70"}),"\n",(0,e.jsx)(l.li,{children:"strip -x \ud30c\uc77c\uc774\ub984: \uc2e4\ud589 \ud30c\uc77c\uc5d0\uc11c \ubaa8\ub4e0 \uc2ec\ubcfc\uacfc \uae30\ud638 \ud14c\uc774\ube14\uc744 \uc81c\uac70"}),"\n",(0,e.jsx)(l.li,{children:"strip -R \ud30c\uc77c\uc774\ub984: libfoo.so \uc2e4\ud589 \ud30c\uc77c\uc5d0\uc11c libfoo.so\uc5d0\uc11c \ucc38\uc870\ud558\ub294 \uc2ec\ubcfc\ub9cc \uc81c\uac70"}),"\n",(0,e.jsx)(l.li,{children:"strip -d \ud30c\uc77c\uc774\ub984: \ub514\ubc84\uadf8\uc6a9 \uc815\ubcf4(\ud30c\uc77c\uba85 \ub610\ub294 \ud589 \ubc88\ud638 \ub4f1)\ub9cc\uc744 \uc81c\uac70\ud558\uace0 \ud568\uc218\uba85 \ub4f1\uc758 \uc77c\ubc18 \uc2ec\ubcfc\uc740 \ub0a8\uc74c"}),"\n",(0,e.jsx)(l.li,{children:"\ub2e4\uc74c \uba85\ub839\uc5b4\uc640 \uac19\uc74c: objcopy --strip-all \ud30c\uc77c\uc774\ub984 \uc800\uc7a5\ud560\uc774\ub984"}),"\n"]}),"\n",(0,e.jsx)("br",{}),"\n",(0,e.jsx)(l.h3,{id:"go-vet",children:"go vet"}),"\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsxs)(l.li,{children:["\uc18c\uc2a4 \ucf54\ub4dc\ub97c \uac80\uc0ac\ud558\uace0 \uc77c\ubd80 \uc77c\ubc18\uc801\uc778 \uc2e4\uc218\ub098 \uc7a0\uc7ac\uc801\uc778 \ubb38\uc81c\ub97c \ucc3e\uae30 \uc704\ud55c \ub3c4\uad6c","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsxs)(l.li,{children:["\uc798\ubabb\ub41c \ud3ec\ub9f7 \ubb38\uc790\uc5f4 \uc0ac\uc6a9","\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"\ubd88\ud544\uc694\ud55c \ucf54\ub4dc"}),"\n",(0,e.jsx)(l.li,{children:"\uc798\ubabb\ub41c \ud0c0\uc785 \ubcc0\ud658"}),"\n",(0,e.jsx)(l.li,{children:"\uae30\ud0c0 \ucf54\ub4dc\uc5d0\uc11c \ubc1c\uc0dd\ud560 \uc218 \uc788\ub294 \uc7a0\uc7ac\uc801\uc778 \ubb38\uc81c"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,e.jsx)("br",{}),"\n",(0,e.jsx)(l.h3,{id:"go-test",children:"go test"}),"\n",(0,e.jsxs)(l.ul,{children:["\n",(0,e.jsx)(l.li,{children:"go test -v: \uc790\uc138\ud55c \ucd9c\ub825\uc73c\ub85c \ud14c\uc2a4\ud2b8\ub97c \uc2e4\ud589\ud569\ub2c8\ub2e4."}),"\n",(0,e.jsx)(l.li,{children:"go test -run TestName: TestName\uacfc \uc77c\uce58\ud558\ub294 \ud14c\uc2a4\ud2b8\ub97c \uc2e4\ud589\ud569\ub2c8\ub2e4."}),"\n"]})]})}function h(n={}){const{wrapper:l}={...(0,r.a)(),...n.components};return l?(0,e.jsx)(l,{...n,children:(0,e.jsx)(t,{...n})}):t(n)}},1151:(n,l,i)=>{i.d(l,{Z:()=>a,a:()=>c});var e=i(7294);const r={},s=e.createContext(r);function c(n){const l=e.useContext(s);return e.useMemo((function(){return"function"==typeof n?n(l):{...l,...n}}),[l,n])}function a(n){let l;return l=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),e.createElement(s.Provider,{value:l},n.children)}}}]);