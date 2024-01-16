"use strict";(self.webpackChunkACRA_Point_V3_Education=self.webpackChunkACRA_Point_V3_Education||[]).push([[2938],{2002:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>g,contentTitle:()=>t,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>a});var i=r(5893),l=r(1151);const o={},t="init.go",s={type:"mdx",permalink:"/ilovedev/wauth/init.go",source:"@site/src/pages/wauth/init.go.md",title:"init.go",description:"init \ud568\uc218\ub294 Go \ud504\ub85c\uadf8\ub7a8\uc774 \uc2e4\ud589\ub420 \ub54c \uc790\ub3d9\uc73c\ub85c \ud638\ucd9c\ub418\ub294 \ud2b9\ubcc4\ud55c \ud568\uc218\ub85c, \ud328\ud0a4\uc9c0 \uc218\uc900\uc5d0\uc11c \uc0ac\uc6a9. init \ud568\uc218\ub294 \ud328\ud0a4\uc9c0\uac00 \ucd08\uae30\ud654\ub420 \ub54c \ud55c \ubc88\ub9cc \ud638\ucd9c\ub418\uba70, \ud328\ud0a4\uc9c0 \ub0b4\uc5d0\uc11c \uc5ec\ub7ec \uac1c\uc758 init \ud568\uc218\ub97c \uac00\uc9c8 \uc218 \uc788\uc74c",frontMatter:{},unlisted:!1},g={},a=[{value:"flag",id:"flag",level:3},{value:"\ud574\uc2dc \uac80\uc0ac",id:"\ud574\uc2dc-\uac80\uc0ac",level:3},{value:"\ub85c\uae45 (logging)",id:"\ub85c\uae45-logging",level:3},{value:"\uc124\uc815 \ud30c\uc77c",id:"\uc124\uc815-\ud30c\uc77c",level:3},{value:"mongodb \uc811\uc18d",id:"mongodb-\uc811\uc18d",level:3}];function c(n){const e={code:"code",h1:"h1",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h1,{id:"initgo",children:"init.go"}),"\n",(0,i.jsx)(e.p,{children:"init \ud568\uc218\ub294 Go \ud504\ub85c\uadf8\ub7a8\uc774 \uc2e4\ud589\ub420 \ub54c \uc790\ub3d9\uc73c\ub85c \ud638\ucd9c\ub418\ub294 \ud2b9\ubcc4\ud55c \ud568\uc218\ub85c, \ud328\ud0a4\uc9c0 \uc218\uc900\uc5d0\uc11c \uc0ac\uc6a9. init \ud568\uc218\ub294 \ud328\ud0a4\uc9c0\uac00 \ucd08\uae30\ud654\ub420 \ub54c \ud55c \ubc88\ub9cc \ud638\ucd9c\ub418\uba70, \ud328\ud0a4\uc9c0 \ub0b4\uc5d0\uc11c \uc5ec\ub7ec \uac1c\uc758 init \ud568\uc218\ub97c \uac00\uc9c8 \uc218 \uc788\uc74c"}),"\n",(0,i.jsx)(e.h3,{id:"flag",children:"flag"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["flag \ud328\ud0a4\uc9c0\ub294 \uba85\ub839\ud589 \uc778\uc790\ub97c \ucc98\ub9ac\ud558\ub294 \ub370 \uc0ac\uc6a9\ub418\ub294 Go \uc5b8\uc5b4\uc758 \ud45c\uc900 \ub77c\uc774\ube0c\ub7ec\ub9ac. \uc774 \ud328\ud0a4\uc9c0\ub97c \uc0ac\uc6a9\ud558\uc5ec \ud504\ub85c\uadf8\ub7a8\uc744 \uc2e4\ud589\ud560 \ub54c \uba85\ub839\ud589\uc5d0\uc11c \uc804\ub2ec\ub41c \uc778\uc790\ub4e4\uc744 \ud30c\uc2f1\ud558\uace0 \ucc98\ub9ac\ud560 \uc218 \uc788\uc74c","\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:'package main\r\n\r\nimport (\r\n  "flag"\r\n  "fmt"\r\n)\r\n\r\nfunc main() {\r\n  var flagHelp bool\r\n  var flagVersion bool\r\n\r\n  flag.BoolVar(&flagHelp, "h", false, "\ub3c4\uc6c0\ub9d0")\r\n  flag.BoolVar(&flagVersion, "version", false, "\ubc84\uc804")\r\n  flag.StringVar(&flagConfigfile, "c", "config.json", "\uc124\uc815\ud30c\uc77c")\r\n  flag.StringVar(&flagConfdir, "conf", "../etc/", "\uc124\uc815\ud30c\uc77c\ud3f4\ub354\uba85")\r\n  flag.BoolVar(&flagLogConsole, "console", false, "\ub85c\uadf8 \ucf58\uc194\ucd9c\ub825")\r\n  flag.BoolVar(&flagLogDebug, "debug", false, "debug \ub85c\uadf8")\r\n  flag.BoolVar(&flagLogVerbose, "verbose", false, "verbose \ub85c\uadf8")\r\n  flag.Parse()\r\n\r\n  help := func() {\r\n    fmt.Printf("Usage of %s:\\n", os.Args[0])\r\n    fmt.Println(`  -h`)\r\n    fmt.Println(`  \ub3c4\uc6c0\ub9d0`)\r\n    fmt.Println(`  -v`)\r\n    fmt.Println(`  \ubc84\uc804`)\r\n    fmt.Println(`  `)\r\n    fmt.Println(`  -c string`)\r\n    fmt.Println(`  \uc124\uc815\ud30c\uc77c\uc704\uce58`)\r\n  }\r\n\r\n  if flagHelp {\r\n    help()\r\n    os.Exit(0)\r\n  }\r\n\r\n  if flagVersion {\r\n    fmt.Printf("Component Name: ACRA Point V%s Server Package\\n", Version)\r\n    fmt.Printf("Component ReleaseVersion: V%s\\n", Build)\r\n    os.Exit(0)\r\n  }\r\n}\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h3,{id:"\ud574\uc2dc-\uac80\uc0ac",children:"\ud574\uc2dc \uac80\uc0ac"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:"h := libutool.NewAppendHash() \r\nhas := h.Has(self)\n"})}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h3,{id:"\ub85c\uae45-logging",children:"\ub85c\uae45 (logging)"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\ub808\ubca8","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Fatal : \uce58\uba85\uc801 \uc5d0\ub7ec (\ub85c\uae45 \ud6c4 \ud504\ub85c\uc138\uc2a4\uac00 \uc885\ub8cc\ub428)"}),"\n",(0,i.jsx)(e.li,{children:"Error : \uc5d0\ub7ec"}),"\n",(0,i.jsx)(e.li,{children:"Normal : \uc77c\ubc18\ub85c\uadf8"}),"\n",(0,i.jsx)(e.li,{children:"Debug : \ub514\ubc84\uae45\uc6a9 \ub85c\uadf8"}),"\n",(0,i.jsx)(e.li,{children:"Verbose : \ub0ae\uc740\uc218\uc900 \ub85c\uadf8"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\uc0ac\uc6a9\uc608","\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:['logging := NewLogging().SetFile("/tmp/a.log").SetConsole(true).SetLevel(true, true, true, true).SetLimit(2, 50000)',"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\uba54\uc11c\ub4dc \uccb4\uc774\ub2dd\uc744 \ud1b5\ud574 \ub2e4\uc591\ud55c \ub85c\uae45 \uc124\uc815\uc744 \uc9c0\uc815"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)("br",{}),"\n",(0,i.jsx)(e.h3,{id:"\uc124\uc815-\ud30c\uc77c",children:"\uc124\uc815 \ud30c\uc77c"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:"libconfigdb - LoadMgoConfig() // \uc124\uc815\uac12 \ucc98\ub9ac\r\nGetConfig()\r\nlibconfigdb - GetKEK()\r\nlibconfigdb - NewFileKey()\n"})}),"\n",(0,i.jsx)(e.h3,{id:"mongodb-\uc811\uc18d",children:"mongodb \uc811\uc18d"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Go \uc5b8\uc5b4\uc6a9 \uacf5\uc2dd \ub4dc\ub77c\uc774\ubc84 \ud328\ud0a4\uc9c0 go.mongodb.org/mongo-driver/mongo"}),"\n",(0,i.jsxs)(e.li,{children:["\uc0ac\uc6a9\uc608","\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",metastring:'title="init.go"',children:'func() {\r\n  option := libmongo.MongoConnectOption{\r\n      Server:             dbcfg.MgoHost,\r\n      Port:               int(dbcfg.MgoPort),\r\n      UserId:             dbcfg.MgoUserID,\r\n      UserPassword:       dbcfg.MgoUserPassword,\r\n      DatabaseName:       dbcfg.MgoDatabase,\r\n      Direct:             !dbcfg.MgoInDirect,\r\n      Timeout:            int64(dbcfg.MgoTimeout),\r\n      Ssl:                dbcfg.MgoSSL,\r\n      TlsCertificateFile: dbcfg.MgoTLSCert,\r\n      Tlsprivatekeyfile:  dbcfg.MgoTLSPriv,\r\n      Tlscafile:          dbcfg.MgoTLSCA,\r\n  }\r\n\r\n  client = libmongo.NewMongoClient(option)\r\n  err := client.Connect()\r\n  if err != nil {\r\n      logging.Fatalln(err)\r\n  }\r\n  logging.Debugln("Mongodb Connect success")\r\n}()\n'})}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{children:"+ libmongo - NewMongoClient\n"})})]})}function d(n={}){const{wrapper:e}={...(0,l.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(c,{...n})}):c(n)}},1151:(n,e,r)=>{r.d(e,{Z:()=>s,a:()=>t});var i=r(7294);const l={},o=i.createContext(l);function t(n){const e=i.useContext(o);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:t(n.components),i.createElement(o.Provider,{value:e},n.children)}}}]);