(this["webpackJsonpvideochat.frontend"]=this["webpackJsonpvideochat.frontend"]||[]).push([[0],{100:function(e,t,n){},102:function(e,t,n){},141:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n.n(c),o=n(30),a=n.n(o),s=(n(100),n(7)),i=n(18),u=n.n(i),d=n(32),l=n(12),f=n(33),j=(n(102),n(179)),p=n(180),b=n(181),O=n(183),h=n(184),x=n(175),v=n(185),w=n(176),k=n(186),m=n(187),g=n(182),C=n(2),P=r.a.createContext();P.displayName="Store";var S,y=function(){return r.a.useContext(P)},E=function(e){var t=e.children,n=e.initialState,c=e.reducer,o=r.a.useReducer(c,n),a=Object(l.a)(o,2),s=a[0],i=a[1];return Object(C.jsx)(P.Provider,{value:[s,i],children:t})},T=n(177),R=n(20),D=n(89),A=n(19),I=n(60),F=["type"],_="APP/SET_USERS",L="APP/REMOVE_USER",M="APP/SET_SOCKET",N="APP/SET_PEER_CONNECTION",U="APP/SET_FIELD",z=function(e){return Object(A.a)({type:U},e)},B={users:[],socket:n.n(I).a.connect("https://at-oku.herokuapp.com/"),peerConnection:null},J=function(e){var t=y(),n=Object(l.a)(t,2),r=n[0],o=n[1],a=Object(c.useState)(),s=Object(l.a)(a,2),i=s[0],f=s[1];console.log("production");var j=function(){var t=Object(d.a)(u.a.mark((function t(n){var c;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({video:!0,audio:!0});case 2:(c=t.sent).getTracks().forEach((function(e){return n.addTrack(e,c)})),n.ontrack=function(t){var n=Object(l.a)(t.streams,1)[0];console.log("stream coming through!",n),e.current.srcObject=n};case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),p=function(){var e=Object(d.a)(u.a.mark((function e(t){var n,c,a,s=arguments;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=!(s.length>1&&void 0!==s[1])||s[1],c=r.peerConnection,n&&(o(z({calling:t})),(c=new window.RTCPeerConnection).onicecandidate=function(e){r.socket.emit("candidate",{to:t,candidate:e.candidate})}),o(z({peerConnection:c})),e.next=6,j(c);case 6:return e.next=8,c.createOffer();case 8:return a=e.sent,e.next=11,c.setLocalDescription(new RTCSessionDescription(a));case 11:console.log("calling user",t),r.socket.emit("call-user",{offer:a,to:t});case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){return r.socket&&(console.log("rebuilding events for connection",r.peerConnection),r.socket.on("update-user-list",(function(e){return o((t=e.users,{type:_,users:t}));var t})),r.socket.on("remove-user",(function(e){var t=e.socketId;return o({type:L,user:t})})),r.socket.on("call-made",function(){var e=Object(d.a)(u.a.mark((function e(t){var n,c;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("receiving a call!! gonna answer it!! from",t.socket,"offer",t.offer),(n=new window.RTCPeerConnection).onicecandidate=function(e){r.socket.emit("candidate",{to:t.socket,candidate:e.candidate})},o(z({peerConnection:n})),e.next=6,j(n);case 6:return e.next=8,n.setRemoteDescription(new RTCSessionDescription(t.offer));case 8:return e.next=10,n.createAnswer();case 10:return c=e.sent,e.next=13,n.setLocalDescription(new RTCSessionDescription(c));case 13:r.socket.emit("make-answer",{answer:c,to:t.socket});case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),r.socket.on("answer-made",function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("they aswered"),console.warn("calling",i),e.next=4,r.peerConnection.setRemoteDescription(new RTCSessionDescription(t.answer));case 4:return e.next=6,j(r.peerConnection);case 6:i||(p(t.socket,!1),f(!0));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),r.socket.on("candidate",(function(e){r.peerConnection&&e.candidate&&(console.log("candidate coming through!",e.candidate),r.peerConnection.addIceCandidate(e.candidate).catch(console.error))}))),function(){r.socket&&(r.socket.off("update-user-list"),r.socket.off("remove-user"),r.socket.off("call-made"),r.socket.off("answer-made"),r.socket.off("candidate"))}}),[r.socket,r.peerConnection,o,i,e]),[p]},V=R.b.video(S||(S=Object(f.a)(["\n  height: 100%;\n  width: 100%;\n"]))),G=window;G.RTCPeerConnection,G.RTCSessionDescription;var H=function(){var e=Object(c.useRef)(null),t=Object(c.useRef)(null),n=y(),r=Object(l.a)(n,2),o=r[0],a=(r[1],J(t)),i=Object(l.a)(a,1)[0];console.log(o),Object(c.useEffect)((function(){t&&o.peerConnection&&(o.peerConnection.ontrack=function(e){var n=Object(l.a)(e.streams,1)[0];t.current.srcObject=n})}),[t,o.peerConnection]);var f=Object(c.useCallback)(Object(d.a)(u.a.mark((function t(){var n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,navigator.mediaDevices.getUserMedia({video:!0,audio:!0});case 3:n=t.sent,e.current.srcObject=n,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.warn(t.t0.message);case 10:case"end":return t.stop()}}),t,null,[[0,7]])}))),[e]);return Object(c.useEffect)((function(){e&&e.current&&f()}),[e,f]),Object(C.jsx)("div",{className:"App",children:Object(C.jsxs)(j.a,{sx:{display:"flex"},children:[Object(C.jsx)(p.a,{}),Object(C.jsx)(b.a,{position:"fixed",sx:{zIndex:function(e){return e.zIndex.drawer+1}},children:Object(C.jsx)(O.a,{children:Object(C.jsx)(h.a,{variant:"h6",noWrap:!0,component:"div",children:"VIDEO CHAT APP"})})}),Object(C.jsxs)(x.a,{variant:"permanent",sx:Object(s.a)({width:240,flexShrink:0},"& .MuiDrawer-paper",{width:240,boxSizing:"border-box"}),children:[Object(C.jsx)(O.a,{}),Object(C.jsxs)(j.a,{sx:{overflow:"auto"},children:[Object(C.jsx)(h.a,{variant:"h5",children:"Online users:"}),Object(C.jsx)(v.a,{children:o.users.map((function(e,t){return Object(C.jsxs)(w.a,{button:!0,onClick:function(){return i(e)},children:[Object(C.jsx)(T.a,{}),Object(C.jsx)(k.a,{primary:e})]},e)}))})]})]}),Object(C.jsxs)(j.a,{component:"main",sx:{flexGrow:1,p:3},children:[Object(C.jsx)(O.a,{}),Object(C.jsxs)(m.a,{style:{position:"relative"},children:[Object(C.jsx)(V,{autoPlay:!0,muted:!0,ref:t}),Object(C.jsx)(j.a,{sx:{width:220,height:200,position:"absolute",right:0,bottom:0},children:Object(C.jsx)(g.a,{elevation:5,children:Object(C.jsx)("video",{autoPlay:!0,muted:!0,ref:e,style:{height:"100%",width:"100%",padding:5}})})})]})]})]})})},K=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,188)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,o=t.getLCP,a=t.getTTFB;n(e),c(e),r(e),o(e),a(e)}))},W=function(e){var t=e.children;return Object(C.jsx)(C.Fragment,{children:t})};a.a.render(Object(C.jsx)(r.a.StrictMode,{children:Object(C.jsx)(E,{initialState:B,reducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case _:return Object(A.a)(Object(A.a)({},e),{},{users:t.users});case L:return Object(A.a)(Object(A.a)({},e),{},{users:e.users.filter((function(e){return e!==t.user}))});case M:return Object(A.a)(Object(A.a)({},e),{},{socket:t.socket});case N:return Object(A.a)(Object(A.a)({},e),{},{peerConnection:t.peerConnection});case U:t.type;var n=Object(D.a)(t,F);return Object(A.a)(Object(A.a)({},e),n);default:return e}},children:Object(C.jsx)(W,{children:Object(C.jsx)(H,{})})})}),document.getElementById("root")),K()}},[[141,1,2]]]);
//# sourceMappingURL=main.a6d4fe3b.chunk.js.map