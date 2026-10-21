/**
 * 질병관리청(KDCA) 소개 인터랙티브 웹 앱 동작 스크립트
 * 프레임워크나 외부 CDN 의존성 없이 순수 Vanilla JS로 로컬 실행 지원
 */

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // 1. "나는 어떤 도움을 받을 수 있을까?" 맞춤형 지원 데이터베이스
  // ----------------------------------------------------
  const supportDatabase = {
    infant: {
      category: "국가예방접종(NIP) 무료 지원",
      categoryClass: "cat-vaccine",
      icon: "👶",
      title: "어린이 국가예방접종 전액 무료 지원 사업",
      desc: "질병관리청은 만 12세 이하 어린이의 건강한 성장을 위해 필수 예방접종 비용을 100% 국가에서 전액 지원합니다. 전국 지정 위탁의료기관 어디서나 주소지와 무관하게 무료로 접종받을 수 있습니다.",
      benefits: [
        "결핵(BCG), B형간염, DTaP, 폴리오(IPV), MMR, 수두, 로타바이러스 등 총 18종 백신 무료",
        "생후 2개월, 4개월, 6개월 등 시기별 접종 알림 문자(SMS) 자동 발송 서비스",
        "온라인 '예방접종도우미' 사이트에서 자녀 접종 내역 및 증명서 무료 즉시 발급"
      ],
      howTo: "💡 이용 방법: 인근 소아과 또는 보건소 방문 (아기수첩 또는 신분증 지참)",
      link: "https://nip.kdca.go.kr",
      linkText: "예방접종도우미 누리집 바로가기"
    },
    senior: {
      category: "어르신 건강보호 지원",
      categoryClass: "cat-medical",
      icon: "👵",
      title: "만 65세 이상 어르신 필수 백신 무료 접종 & 치매·심뇌혈관 관리",
      desc: "면역력이 약해지기 쉬운 어르신들의 감염 및 합병증 입원을 예방하기 위해 독감, 폐렴구균, 코로나19 백신을 무상으로 접종해 드리며, 심뇌혈관질환 조기 발견 지침을 제공합니다.",
      benefits: [
        "매년 가을·겨울철 어르신 인플루엔자(독감) 4가 백신 1회 무료 접종",
        "만 65세 이상 평생 1회 폐렴구균(23가) 전국 보건소 및 지정병원 무료 접종",
        "코로나19 신규 유행 변이(JN.1 등) 대응 백신 절기별 무료 접종",
        "뇌졸중·급성심근경색증 조기 증상 인지 및 응급이송 프로토콜 안내"
      ],
      howTo: "💡 이용 방법: 신분증(주민등록증/운전면허증) 지참 후 가까운 동네 병의원 방문",
      link: "https://nip.kdca.go.kr",
      linkText: "어르신 지정 위탁의료기관 찾기"
    },
    pregnant: {
      category: "임신부 안심 케어",
      categoryClass: "cat-medical",
      icon: "🤰",
      title: "임신부 인플루엔자 무료 접종 및 감염병 모자보건 보호",
      desc: "임신 중 감염 시 중증 합병증 위험이 높은 산모와 태아를 보호하기 위해 독감 백신을 지원하고 임신 주기별 주의 감염병 예방지침을 제공합니다.",
      benefits: [
        "임신 주수와 상관없이 임신부 인플루엔자(독감) 백신 전액 무료 접종",
        "임신부 백일해(Tdap) 접종 권고 및 태아 면역 전달 가이드 제공",
        "지카바이러스 등 임신부 위험 해외 유입 감염병 발생국 여행경보 및 예방지침"
      ],
      howTo: "💡 이용 방법: 산모수첩 또는 임신확인서 지참 후 산부인과/지정의료기관 방문",
      link: "https://nip.kdca.go.kr",
      linkText: "임신부 예방접종 상세 안내 보기"
    },
    chronic: {
      category: "만성·희귀질환 지원",
      categoryClass: "cat-info",
      icon: "🩺",
      title: "희귀질환자 의료비 지원사업 및 국가건강정보포털 가이드",
      desc: "치료비 부담이 큰 희귀질환 환자와 가족을 위한 의료비 지원 사업을 주관하며, 고혈압·당뇨·이상지질혈증 등 만성질환자의 생활습관 개선을 돕는 신뢰도 높은 의학정보를 제공합니다.",
      benefits: [
        "희귀질환 1,200여 종 대상 진료비 본인부담금 10% 지원 및 특수식(특수분유) 구입비 보조",
        "국가건강정보포털(health.kdca.go.kr)을 통한 전문의 감수 2,000여 질환별 맞춤 건강정보",
        "고혈압·당뇨병 등록교육센터를 통한 지속적인 복약 및 혈당·혈압 관리 코칭"
      ],
      howTo: "💡 이용 방법: 관할 보건소 방문 희귀질환 등록 신청 또는 질병관리청 국가건강정보포털 접속",
      link: "https://helpline.kdca.go.kr",
      linkText: "희귀질환 헬프라인 누리집 가기"
    },
    traveler: {
      category: "해외감염병 & 전자검역",
      categoryClass: "cat-travel",
      icon: "✈️",
      title: "국가별 유행 감염병 정보, 말라리아 예방약 안내 & Q-CODE(전자검역)",
      desc: "해외여행 시 발생할 수 있는 뎅기열, 말라리아, 황열 등 감염병을 예방하고, 귀국 시 복잡한 종이 서류 없이 스마트폰으로 빠르게 검역을 마칠 수 있도록 지원합니다.",
      benefits: [
        "여행 국가별 맞춤형 예방접종(황열, 콜레라 등) 및 예방약 처방 의료기관 안내",
        "Q-CODE(검역정보 사전입력시스템): 입국 전 모바일 입력으로 QR코드 발급 후 초고속 입국",
        "입국 후 잠복기 질환(설사, 발열, 발진 등) 발생 시 질병관리청 1339 원스톱 의료상담"
      ],
      howTo: "💡 이용 방법: 출국 전 '해외감염병NOW' 검색, 귀국 비행기 탑승 전 Q-CODE 등록",
      link: "https://qcode.kdca.go.kr",
      linkText: "Q-CODE(전자검역) 바로가기"
    },
    infection_symptom: {
      category: "24시간 긴급 상담",
      categoryClass: "cat-emergency",
      icon: "🤒",
      title: "질병관리청 1339 콜센터 24시간 감염병 즉시 전문상담",
      desc: "의심되는 감염병 증상이 있거나, 격리 기준, 법정 감염병 신고, 선별진료 안내가 필요할 때 1년 365일 24시간 전문 상담원이 즉시 안내해 드립니다.",
      benefits: [
        "국번 없이 1339 (무료 전화 상담, 24시간 연중무휴 전문 간호사/상담사 대기)",
        "카카오톡 채널 '질병관리청 1339'를 통한 실시간 모바일 채팅 상담 제공",
        "감염병 의심 시 선별진료 의료기관 및 안심병원 실시간 위치 안내"
      ],
      howTo: "💡 이용 방법: 전화기에서 국번 없이 1339 누르기 또는 카카오톡 플러스친구 추가",
      link: "https://www.kdca.go.kr",
      linkText: "1339 콜센터 안내 페이지"
    },
    vaccine_adverse: {
      category: "국가책임 보상제도",
      categoryClass: "cat-emergency",
      icon: "🩹",
      title: "예방접종 피해 국가보상 제도 (백신 이상반응 국가책임제)",
      desc: "국가예방접종 후 불가피하게 발생한 이상반응에 대해 진료비, 간병비, 장애일시보상금 등을 국가가 심의하여 보상해 드리는 든든한 안전장치입니다.",
      benefits: [
        "백신 접종 후 이상반응 발생 시 진료비 본인부담금 및 정액 간병비 지원",
        "접종 5년 이내 주소지 관할 보건소에 보상 신청서 접수 가능",
        "인과성 불명확 질환에 대한 특별 의료비 지원 사업 병행 운영"
      ],
      howTo: "💡 이용 방법: 관할 보건소 예방접종 담당 부서에 이상반응 보상신청서 및 진료기록 제출",
      link: "https://nip.kdca.go.kr",
      linkText: "피해보상 신청 서식 및 기준 확인"
    },
    daily_health: {
      category: "대국민 건강지식",
      categoryClass: "cat-info",
      icon: "🏃",
      title: "계절별 건강안전 가이드 및 국가 보건의료 근거기반 통계",
      desc: "미세먼지, 여름철 온열질환(열사병), 겨울철 한랭질환(저체온증) 등 계절별 건강수칙과 근거 중심의 신뢰할 수 있는 일상 건강 가이드를 제공합니다.",
      benefits: [
        "폭염·한파 대비 일일 온열/한랭질환자 통계 및 취약계층 행동요령 알림",
        "심뇌혈관질환 예방을 위한 9대 생활수칙 카드뉴스 및 동영상 자료 보급",
        "국민건강영양조사 기반의 성별·연령별 한국인 영양·비만·만성질환 표준 데이터 열람"
      ],
      howTo: "💡 이용 방법: 질병관리청 국가건강정보포털에서 검색어(예: 고혈압, 온열질환) 입력",
      link: "https://health.kdca.go.kr",
      linkText: "국가건강정보포털 바로가기"
    }
  };

  // ----------------------------------------------------
  // 2. 체크리스트 설문 인터랙션 로직
  // ----------------------------------------------------
  const checklistForm = document.getElementById('support-checklist-form');
  const resultArea = document.getElementById('survey-result-area');
  const resultContainer = document.getElementById('result-cards-container');
  const resultCountBadge = document.getElementById('result-count');
  const btnReset = document.getElementById('btn-reset-checklist');

  if (checklistForm) {
    checklistForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const selectedCheckboxes = document.querySelectorAll('input[name="situation"]:checked');
      const selectedKeys = Array.from(selectedCheckboxes).map(cb => cb.value);

      resultArea.style.display = 'block';
      resultContainer.innerHTML = '';

      if (selectedKeys.length === 0) {
        resultCountBadge.textContent = '0건';
        resultContainer.innerHTML = `
          <div class="no-selection-box">
            <div class="icon">🔍</div>
            <h5 style="font-size: 1.15rem; color: #1e293b; margin-bottom: 0.5rem;">선택된 항목이 없습니다</h5>
            <p>위의 체크리스트에서 본인 또는 가족의 상황에 해당하는 항목을 하나 이상 선택하신 후 버튼을 눌러주세요.</p>
          </div>
        `;
      } else {
        resultCountBadge.textContent = `${selectedKeys.length}건의 맞춤 지원`;

        selectedKeys.forEach(key => {
          const item = supportDatabase[key];
          if (!item) return;

          const card = document.createElement('div');
          card.className = 'result-card';
          
          let benefitsHtml = '';
          item.benefits.forEach(b => {
            benefitsHtml += `<li>${b}</li>`;
          });

          card.innerHTML = `
            <div class="result-card-top">
              <span class="badge-category ${item.categoryClass}">${item.icon} ${item.category}</span>
            </div>
            <h5>${item.title}</h5>
            <p class="result-card-desc">${item.desc}</p>
            <ul class="benefit-bullet-list">
              ${benefitsHtml}
            </ul>
            <div class="result-card-action">
              <span class="result-how-to">${item.howTo}</span>
              <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="btn-service-link">
                ${item.linkText} &rarr;
              </a>
            </div>
          `;

          resultContainer.appendChild(card);
        });
      }

      // 결과 영역으로 부드럽게 스크롤 이동
      const headerOffset = 80;
      const elementPosition = resultArea.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    });

    // 초기화 버튼 이벤트
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        checklistForm.reset();
        resultArea.style.display = 'none';
        resultContainer.innerHTML = '';
      });
    }
  }

  // ----------------------------------------------------
  // 3. 탭(Tab) 인터랙션 기능
  // ----------------------------------------------------
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      button.classList.add('active');

      const targetId = button.getAttribute('data-target');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ----------------------------------------------------
  // 4. '맨 위로 이동' 상단 스크롤 버튼
  // ----------------------------------------------------
  const backToTopBtn = document.getElementById('btn-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ----------------------------------------------------
  // 5. 내비게이션 부드러운 스크롤 (헤더 고정 높이 오프셋 보정)
  // ----------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-item, .hero-cta-btn');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetHref = link.getAttribute('href');
      if (targetHref && targetHref.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetHref);
        if (targetElement) {
          const headerOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  console.log("질병관리청(KDCA) 포털: '맞춤 지원 혜택 체크리스트' 기능이 정상 활성화되었습니다.");
});
