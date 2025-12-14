(()=>{var a={};a.id=80,a.ids=[80],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},68483:(a,b,c)=>{"use strict";c.d(b,{n:()=>g});let d=process.env.OPENROUTER_API_KEY||"",e=process.env.OPENROUTER_MODEL||"anthropic/claude-3.5-sonnet:free";class f{constructor(){this.baseUrl="https://openrouter.ai/api/v1",this.apiKey=d,this.model=e}async complete(a){try{console.log("\uD83E\uDD16 OpenRouter Request:",{model:this.model,apiKeyPresent:!!this.apiKey,messagesCount:a.length});let b=await fetch(`${this.baseUrl}/chat/completions`,{method:"POST",headers:{Authorization:`Bearer ${this.apiKey}`,"Content-Type":"application/json","HTTP-Referer":process.env.NEXT_PUBLIC_APP_URL||"http://localhost:3000"},body:JSON.stringify({model:this.model,messages:a,temperature:.7})});if(console.log("\uD83E\uDD16 OpenRouter Response:",{status:b.status,statusText:b.statusText,ok:b.ok}),!b.ok){let a=await b.text();throw console.error("❌ OpenRouter Error:",a),Error(`OpenRouter API error: ${b.statusText} - ${a}`)}let c=await b.json();return console.log("✅ OpenRouter Success:",{hasContent:!!c.choices?.[0]?.message?.content}),c.choices[0]?.message?.content||""}catch(a){throw console.error("OpenRouter API error:",a),a}}async parseRFQEmail(a){let b=`You are an expert RFQ (Request for Quote) analyzer for contractors. 
Your job is to extract structured information from customer emails requesting quotes for construction/contracting work.

Extract the following information in JSON format:
- client_name: Full name of the client
- client_email: Email address
- client_phone: Phone number if available
- project_type: Type of work (e.g., "plumbing", "electrical", "roofing", "renovation")
- scope_of_work: Detailed description of what needs to be done
- location: Project location/address
- timeline: When they need the work done
- budget_range: If they mention a budget, extract min/max/currency
- materials_needed: Array of materials mentioned
- special_requirements: Any special conditions or requirements
- deadline: When they need the quote by

Also provide:
- confidence: A score from 0-100 indicating how confident you are in the extraction
- reasoning: Brief explanation of your confidence level

Return only valid JSON, no markdown formatting.`,c=`Email Subject: ${a.email_subject||"No subject"}

Email Body:
${a.email_body}

${a.user_context?.past_jobs?`
Context: This contractor has worked on similar projects: ${a.user_context.past_jobs.join(", ")}`:""}

Please extract the RFQ information in JSON format.`;try{let d=(await this.complete([{role:"system",content:b},{role:"user",content:c}])).match(/\{[\s\S]*\}/);if(!d)throw Error("No valid JSON found in AI response");let e=JSON.parse(d[0]);return{parsed_data:{client_name:e.client_name||"Unknown",client_email:e.client_email||"",client_phone:e.client_phone,project_type:e.project_type||"General",scope_of_work:e.scope_of_work||a.email_body.substring(0,500),location:e.location,timeline:e.timeline,budget_range:e.budget_range,materials_needed:e.materials_needed||[],special_requirements:e.special_requirements||[],deadline:e.deadline},confidence:e.confidence||75,raw_prompt:c,ai_reasoning:e.reasoning}}catch(b){return console.error("Error parsing RFQ:",b),{parsed_data:{client_name:"Unknown",client_email:"",project_type:"General",scope_of_work:a.email_body,budget_range:{currency:"USD"}},confidence:30,ai_reasoning:"Failed to parse email, using fallback extraction"}}}async generateProposal(a){let b=`You are an expert proposal writer for contractors. Create professional, winning proposals that are:
- Clear and specific about scope of work
- Professionally formatted
- Include detailed pricing breakdowns
- Set clear expectations on timeline
- Include standard terms and conditions

Return the proposal in JSON format matching this structure:
{
  "title": "Proposal for [Project]",
  "client_info": { "name": "", "email": "", "phone": "" },
  "project_overview": "Brief overview paragraph",
  "scope_of_work": ["item 1", "item 2", ...],
  "timeline": {
    "estimated_duration": "X weeks",
    "start_date": "YYYY-MM-DD",
    "completion_date": "YYYY-MM-DD"
  },
  "pricing": {
    "line_items": [
      { "id": "1", "description": "", "quantity": 1, "unit": "job", "unit_price": 0, "total": 0 }
    ],
    "subtotal": 0,
    "tax": 0,
    "total": 0,
    "currency": "USD"
  },
  "terms_and_conditions": ["Payment: 50% deposit...", "Warranty: ...", ...],
  "valid_until": "YYYY-MM-DD",
  "notes": "Additional notes"
}`,c=`Generate a proposal for this project:

Client: ${a.parsed_rfq.client_name}
Email: ${a.parsed_rfq.client_email}
Phone: ${a.parsed_rfq.client_phone||"Not provided"}

Project Type: ${a.parsed_rfq.project_type}
Scope: ${a.parsed_rfq.scope_of_work}
Location: ${a.parsed_rfq.location||"Not specified"}
Timeline: ${a.parsed_rfq.timeline||"To be determined"}

Recommended Pricing: $${a.pricing_suggestion.recommended_price}
Price Range: $${a.pricing_suggestion.price_range.min} - $${a.pricing_suggestion.price_range.max}

Company: ${a.user_info.company_name}
Contact: ${a.user_info.contact_info}

Tone: ${a.template_preferences?.tone||"professional"}

Create a complete proposal in JSON format.`;try{let a=(await this.complete([{role:"system",content:b},{role:"user",content:c}])).match(/\{[\s\S]*\}/);if(!a)throw Error("No valid JSON found in AI response");return JSON.parse(a[0])}catch(b){return console.error("Error generating proposal:",b),{title:`Proposal for ${a.parsed_rfq.project_type}`,client_info:{name:a.parsed_rfq.client_name,email:a.parsed_rfq.client_email,phone:a.parsed_rfq.client_phone},project_overview:a.parsed_rfq.scope_of_work,scope_of_work:[a.parsed_rfq.scope_of_work],timeline:{estimated_duration:"2-3 weeks"},pricing:{line_items:[{id:"1",description:a.parsed_rfq.project_type,quantity:1,unit:"job",unit_price:a.pricing_suggestion.recommended_price,total:a.pricing_suggestion.recommended_price}],subtotal:a.pricing_suggestion.recommended_price,total:a.pricing_suggestion.recommended_price,currency:"USD"},terms_and_conditions:["Payment: 50% deposit required to start, 50% upon completion","Warranty: 1 year on labor, manufacturer warranty on materials","Changes to scope may affect pricing and timeline"]}}}}let g=new f},75095:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>C,patchFetch:()=>B,routeModule:()=>x,serverHooks:()=>A,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>z});var d={};c.r(d),c.d(d,{POST:()=>w});var e=c(95736),f=c(9117),g=c(4044),h=c(39326),i=c(32324),j=c(261),k=c(54290),l=c(85328),m=c(38928),n=c(46595),o=c(3421),p=c(17679),q=c(41681),r=c(63446),s=c(86439),t=c(51356),u=c(10641),v=c(68483);async function w(a){try{let{email_body:b,email_subject:c,sender_email:d,sender_name:e}=await a.json();if(!b)return u.NextResponse.json({success:!1,error:"Email body is required"},{status:400});let f=await v.n.parseRFQEmail({email_body:b,email_subject:c||"No subject"});return u.NextResponse.json({success:!0,parsed_data:f.parsed_data,confidence:f.confidence,ai_reasoning:f.ai_reasoning})}catch(a){return console.error("Parse email error:",a),u.NextResponse.json({success:!1,error:"Internal server error"},{status:500})}}let x=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/parse-email/route",pathname:"/api/parse-email",filename:"route",bundlePath:"app/api/parse-email/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"C:\\Users\\LENOVO\\Documents\\xano\\src\\app\\api\\parse-email\\route.ts",nextConfigOutput:"",userland:d}),{workAsyncStorage:y,workUnitAsyncStorage:z,serverHooks:A}=x;function B(){return(0,g.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:z})}async function C(a,b,c){var d;let e="/api/parse-email/route";"/index"===e&&(e="/");let g=await x.prepare(a,b,{srcPage:e,multiZoneDraftMode:!1});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:y,prerenderManifest:z,routerServerContext:A,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(z.dynamicRoutes[E]||z.routes[D]);if(F&&!y){let a=!!z.routes[D],b=z.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||x.isDev||y||(G="/index"===(G=D)?"/":G);let H=!0===x.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:z,renderOpts:{experimental:{cacheComponents:!!w.experimental.cacheComponents,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>x.onRequestError(a,b,d,A)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>x.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&B&&C&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await x.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})},A),b}},l=await x.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:z,isRoutePPREnabled:!1,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",B?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(b instanceof s.NoFallbackError||await x.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},78335:()=>{},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},96487:()=>{}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[586,692],()=>b(b.s=75095));module.exports=c})();