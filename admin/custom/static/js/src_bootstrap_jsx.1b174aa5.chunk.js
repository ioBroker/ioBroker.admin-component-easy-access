"use strict";(self.webpackChunk_iobroker_admin_component_easy_access=self.webpackChunk_iobroker_admin_component_easy_access||[]).push([["src_bootstrap_jsx"],{40067:(x,v,a)=>{var f=a(28437),e=a.n(f),C=a(94140),g=a(95973),o=a.n(g),t=a(16257),m=a(60556),u=a(75636);const i={table:{minWidth:400},header:{fontSize:16,fontWeight:"bold"}};class p extends m.ConfigGeneric{componentDidMount(){super.componentDidMount(),this.props.oContext.socket.getAdapterInstances().then(r=>{r=r.filter(n=>{var c;return((c=n==null?void 0:n.common)==null?void 0:c.adminUI)&&(n.common.adminUI.config!=="none"||n.common.adminUI.tab)}).map(n=>({id:n._id.replace(/^system\.adapter\./,""),config:n.common.adminUI.config!=="none",adminTab:n.common.adminTab})).sort((n,c)=>n.id>c.id?1:n.id<c.id?-1:0),this.setState({instances:r})})}renderItem(r,n,c){if(!this.state.instances)return null;const b=m.ConfigGeneric.getValue(this.props.data,"accessAllowedConfigs")||[],h=m.ConfigGeneric.getValue(this.props.data,"accessAllowedTabs")||[];return e().createElement(t.TableContainer,null,e().createElement(t.Table,{style:i.table,size:"small"},e().createElement(t.TableHead,null,e().createElement(t.TableRow,null,e().createElement(t.TableCell,{style:i.header},u.I18n.t("custom_easy_Instance")),e().createElement(t.TableCell,{style:i.header},u.I18n.t("custom_easy_Config")),e().createElement(t.TableCell,{style:i.header},u.I18n.t("custom_easy_Tab")))),e().createElement(t.TableBody,null,this.state.instances.map(l=>e().createElement(t.TableRow,{key:l.id},e().createElement(t.TableCell,{component:"th",scope:"row"},l.id),e().createElement(t.TableCell,null,l.config?e().createElement(t.Checkbox,{checked:b.includes(l.id),onClick:()=>{const s=[...b],d=s.indexOf(l.id);d!==-1?s.splice(d,1):(s.push(l.id),s.sort()),this.onChange("accessAllowedConfigs",s)}}):null),e().createElement(t.TableCell,null,l.adminTab?e().createElement(t.Checkbox,{checked:h.includes(l.id),onClick:()=>{const s=[...h],d=s.indexOf(l.id);d!==-1?s.splice(d,1):(s.push(l.id),s.sort()),this.onChange("accessAllowedTabs",s)}}):null))))))}}p.propTypes={socket:o().object.isRequired,themeType:o().string,themeName:o().string,style:o().object,data:o().object.isRequired,schema:o().object,onError:o().func,onChange:o().func};const T=p;var y=a(28437);function E(){return y.createElement(T,null)}const _=E;C.createRoot(document.getElementById("root")).render(e().createElement(e().StrictMode,null,e().createElement(_,null)))}}]);

//# sourceMappingURL=src_bootstrap_jsx.1b174aa5.chunk.js.map