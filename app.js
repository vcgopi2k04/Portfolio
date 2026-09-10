const modules=[
['01','Networking Core','TCP/IP, OSI, routing & switching, DNS, TLS, VPNs, BGP','NIST · RFCs · CISA','Foundations'],
['02','OS & Systems','Windows internals, Linux administration, Bash/PowerShell, system logs','MITRE · Microsoft · Linux','Foundations'],
['03','Cloud Fundamentals','AWS, Azure, GCP, virtualization, containers and IAM basics','CSA · CIS · Cloud docs','Foundations'],
['04','SIEM Architecture','Parsing, normalization, correlation, data lakes, indexing and scale','NIST · MITRE · SANS','Detection'],
['05','SOAR Engineering','API orchestration, playbooks, incident automation and ticketing','CISA · OASIS · SANS','Detection'],
['06','UEBA','Behavioral profiles, baselines, anomaly scoring and insider-risk models','NIST · MITRE','Detection'],
['07','NDR & NBAD','NetFlow/IPFIX, PCAP, DPI and encrypted traffic analytics','IETF · SANS · MITRE','Detection'],
['08','CTEM','ASM, exposure validation, BAS and risk prioritization','CISA · NIST · MITRE','Detection'],
['09','Zero Trust Architecture','Identity-first policy, SASE/SSE, ZTNA, CASB, SWG and segmentation','NIST SP 800-207 · CISA','Architecture'],
['10','IAM & ITDR','PAM, CIAM, federation, SAML, OAuth 2.0, OIDC and identity threat detection','NIST · IETF · OWASP','Architecture'],
['11','EDR/XDR','Endpoint telemetry, behavioral detection, response and kernel visibility','MITRE · CISA · Microsoft','Architecture'],
['12','Application Security & DevSecOps','SAST, DAST, SCA, API security and CI/CD security gates','OWASP · NIST · SLSA','Architecture'],
['13','AI & ML Security','AI pipelines, LLM risks, AI SOC automation and adversarial ML','OWASP · NIST AI RMF · MITRE ATLAS','Future'],
['14','Data Security & Cryptography','Encryption, PKI, PQC, DLP and DSPM architecture','NIST · IETF · FIPS','Future'],
['15','Cloud-Native Security','CSPM, CWPP, CIEM, Kubernetes and IaC scanning','CNCF · CSA · NIST','Future'],
['16','OT / IoT Security','SCADA, ICS, Purdue model and hardware security','NIST · CISA · IEC 62443','Future'],
['17','Threat Intelligence','Collection, requirements, enrichment, confidence, TTPs and reporting','MITRE · STIX/TAXII · CISA','OSINT'],
['18','Network Reconnaissance','Passive DNS, WHOIS, CT logs, safe infrastructure mapping','RFCs · ICANN · CISA','OSINT'],
['19','Data Scraping','Parsing, APIs, rate limits, provenance and reproducible collection','W3C · platform policies','OSINT'],
['20','Identity Verification','Source triangulation, account linkage and confidence scoring','Bellingcat · NIST','OSINT'],
['21','Geolocation','Visual landmarks, maps, metadata, terrain and uncertainty','Bellingcat · USGS','OSINT'],
['22','Social Media Analysis','Public-source collection, timelines, network analysis and evidence hygiene','OSINT Framework · platform policies','OSINT'],
['23','Legal & Ethical OSINT','Authorization, privacy, ToS, jurisdiction and data minimization','IC3 · EFF · local law','OSINT'],
['24','Principal Architecture Capstone','Multi-cloud zero trust SOC with CTEM, TI, identity and resilient operations','NIST · MITRE · CISA','Future']
];
const news=[
['HIGH','CISA KEV Catalog','Prioritize newly exploited vulnerabilities and validate exposure against your asset inventory.','Vulnerability'],
['HIGH','Threat actor TTP delta','Compare fresh actor reporting against ATT&CK techniques and update detections only after validation.','Threat actors'],
['MED','NVD / CVE watch','Review new CVEs for affected technology, exploit maturity, compensating controls and patch urgency.','Vulnerability'],
['INFO','Security research pulse','Read one technical paper or vendor-neutral report and record the architectural implication.','Research'],
['INFO','Regulatory radar','Track NIS2, DORA, SEC, DPDP and other jurisdiction-specific changes relevant to enterprise security.','Regulation']
];
function renderModules(filter='All',q=''){const box=document.getElementById('curriculumList');if(!box)return;box.innerHTML=modules.filter(m=>(filter==='All'||m[4]===filter)&&m.join(' ').toLowerCase().includes(q.toLowerCase())).map((m,i)=>`<div class="module"><div class="module-num">${m[0]}</div><div><h3>${m[1]}</h3><p>${m[2]}</p><div class="module-tags"><span class="tag">${m[4]}</span><span class="tag">${m[3]}</span></div></div><button onclick="startModule('${m[1]}')">${i<3?'Review':'Start'} →</button></div>`).join('')}
function renderNews(){const box=document.getElementById('newsFeed');box.innerHTML=news.map(n=>`<article class="feed-item"><span class="severity ${n[0].toLowerCase()==='high'?'high':n[0].toLowerCase()==='med'?'med':'info'}">${n[0]}</span><h3>${n[1]}</h3><p>${n[2]}</p><div class="meta">Continuous Learning Engine · ${n[3]} · source refresh required for live content</div></article>`).join('')}
function openView(id){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.getElementById(id)?.classList.add('active');document.querySelectorAll('.nav-item').forEach(a=>a.classList.toggle('active',a.dataset.view===id));history.replaceState(null,'','#'+id);window.scrollTo({top:0,behavior:'smooth'});if(id==='curriculum')renderModules();if(id==='news')renderNews()}
function startModule(name){showToast(`${name} added to today's study plan ✓`);localStorage.setItem('lastModule',name)}
function showToast(t){const x=document.getElementById('toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),2200)}
document.querySelectorAll('.nav-item').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();openView(a.dataset.view)}));document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderModules(b.textContent)}));document.getElementById('globalSearch').addEventListener('input',e=>{if(!document.getElementById('curriculum').classList.contains('active'))openView('curriculum');renderModules('All',e.target.value)});document.getElementById('refreshNews').addEventListener('click',()=>{renderNews();showToast('Feed sync requested · sources ready for API/RSS integration')});document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));document.getElementById('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('dark');showToast('Theme preference updated')});
if(location.hash&&document.getElementById(location.hash.slice(1)))openView(location.hash.slice(1));renderModules();renderNews();
