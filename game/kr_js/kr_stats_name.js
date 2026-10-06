/*
 * 한글판 전용 매크로: <<moneyStatsNamesKr key>>
 * 통계 화면의 자금(Money) 항목 키(camelCase 영문, 예: cafeWaiter)를 한글 이름으로 변환해 출력한다.
 * 처리 순서: 특수 키 처리 → fullMatch(문장 전체 예외) → 복합어 선치환 → wordDict(단어별 1:1 치환).
 * 사전에 없는 단어는 영어 그대로 출력된다.
 */
Macro.add('moneyStatsNamesKr', {
	handler: function () {
		let key = this.args[0];
		if (!key || typeof key !== "string") {
			$(this.output).append(String(key || ""));
			return;
		}

		let eng = "";
		if (key === "cafeWaiter") {
			eng = State.variables.player.gender_appearance === "m" ? "Cafe Waiter" : "Cafe Waitress";
		} else if (key === "partyDanceTips") {
			eng = "Party Dance Job Tips";
		} else if (key === "danubeDanceTips") {
			eng = "Danube Dance Job Tips";
		} else {
			eng = key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase()).trim();
		}

		// 2. 문장 전체가 고정된 예외 사전
		const fullMatch = {
			"Not Tracked": "미추적",
			"Cafe Chef": "카페 요리사 알바",
			"Estate Betting": "블랙잭 도박",
			"Compound Phials": "약병(단지)",
			"Hospital Parasites Sold": "기생충 판매(병원)",
			"Hospital Paternity Test": "친자 확인 검사",
			"Hospital Breast Reduction": "가슴 축소 수술",
			"Hospital Breast Enlargement": "가슴 확대 수술",
			"Hospital Penis Reduction": "성기 축소 수술",
			"Hospital Penis Enlargement": "성기 확대 수술",
			"Hospital Tattoo Removal": "문신 제거(병원)",
			"Hospital Parasite Removal": "기생충 제거(병원)",
			"Pharmacy After Pill": "약국 사후피임약",
			"People Of Interest": "주요 인물",
			"Party Dance Job": "파티 댄스 알바",
			"Danube Dance Job": "다뉴브 댄스 알바",
			"Party Dance Job Tips": "파티 댄스 알바 팁",
			"Danube Dance Job Tips": "다뉴브 댄스 알바 팁",
			"Cafe Waiter": "카페 웨이터",
			"Cafe Waitress": "카페 웨이트리스",
			"Tutorial Man": "튜토리얼",
			"Tutorial Woman": "튜토리얼",
			"Strip Club Bartender": "스트립 클럽 바텐더 팁",
			"Strip Club Dancer": "스트립 클럽 댄서 팁"
		};

		// 3. 단어 1:1 매칭 사전
		const wordDict = {
			"Starting": "시작", "Money": "자금", "Town": "마을", "Debug": "디버그",
			"Farm": "농장", "Upgrades": "업그레이드", "Orphanage": "고아원", "Blackjack": "블랙잭",
			"Bailey": "베일리", "Rent": "집세", "Museum": "박물관", "Antique": "골동품",
			"Cafe": "카페", "Chef": "요리사", "Buns": "빵", "Tailor": "재단사", "Clothes": "옷",
			"Hospital": "병원", "Shopping": "쇼핑", "Bay": "베이", "Window": "윈도우", "Decor": "장식",
			"Prostitution": "매춘", "Moor": "황야", "Riding": "승마", "Lessons": "레슨",
			"Lube": "윤활제", "Tip": "팁", "Tips": "팁", "Bribe": "뇌물", "Arcade": "오락실",
			"Brothel": "창관", "Gloryhole": "글로리홀", "Show": "쇼",
			"Condoms": "콘돔", "Bus": "버스", "Dance": "댄스", "Studio": "스튜디오",
			"Danube": "다뉴브", "Party": "파티", "Gift": "선물", "Docks": "부두", "Wage": "임금",
			"Factory": "공장", "Produce": "농산물", "Flats": "아파트", "Hookah": "물담배", "Cleaning": "청소",
			"Paternity": "친자", "Test": "검사", "Breast": "가슴", "Reduction": "축소", "Enlargement": "확대",
			"Penis": "성기", "Tattoo": "문신", "Removal": "제거", "Parasite": "기생충",
			"Pharmacy": "약국", "Contacts": "콘택트렌즈", "Pump": "유축기", "Pregnancy": "임신",
			"Cream": "크림", "Pills": "알약", "After": "사후", "Pill": "피임약",
			"Market": "시장", "Stall": "가판대", "Collar": "목걸이", "Pub": "술집",
			"Pepper": "호신", "Spray": "스프레이", "Alcohol": "술",
			"Pregnant": "임신한", "Student": "학생", "School": "학교", "Pool": "수영장",
			"Stimulant": "각성제", "Project": "프로젝트", "Library": "도서관", "Books": "책",
			"Cosmetics": "화장품", "Furniture": "가구", "Hairdressers": "미용실", "Robin": "로빈",
			"Pet": "펫", "Shop": "샵", "Toy": "장난감", "Supermarket": "슈퍼마켓", "Spa": "스파",
			"Thievery": "절도", "Strip": "스트립", "Club": "클럽",
			"Avery": "에이버리", "Sydney": "시드니", "Whitney": "휘트니", "Police": "경찰",
			"Jobs": "알바", "Job": "알바", "People": "주요", "Interest": "인물",
			"Canal": "운하", "Photo": "사진", "Forest": "숲", "Temple": "신전",
			"Adult": "성인용품", "Office": "사무실", "Pound": "축사", "Pirates": "해적선",
			"Blitz": "블리츠", "Fishing": "낚시", "Asylum": "정신병원", "Mansion": "저택",
			"Beach": "해변", "Underground": "지하", "Compound": "엘크 단지",
			"Bartender": "바텐더", "Dancer": "댄서", "Waiter": "웨이터", "Waitress": "웨이트리스",
			"Dancing": "댄스 팁", "Estate": "블랙잭", "Betting": "도박",
			"Landfill": "매립지",
			"Alex": "알렉스", "Alley": "골목", "Backyard": "뒷마당", "Barb": "바브 가", "Building": "건물",
			"Cabin": "오두막", "Castle": "성", "Cave": "동굴", "Changingroom": "탈의실", "Chocolate": "초콜릿",
			"Churchyard": "교회 묘지", "Cliff": "클리프 가", "Coastpath": "해안 산책로", "Commercial": "상업 지구",
			"Connudatus": "콘누다투스 가", "Cottage": "오두막", "Domus": "도무스 가", "Drain": "배수구", "Elk": "엘크 가",
			"Farmroad3": "농장 도로 3", "Garden": "정원", "Grounds": "부지", "Harvest": "하베스트 가", "High": "하이 가",
			"Home": "집", "Industrial": "공업 지구", "Island": "섬", "Kylarmanor": "카일라 저택", "Lair": "소굴",
			"Lake": "호수", "Manors": "저택", "Mer": "메르 가", "Mines": "광산", "Monster": "괴물", "Night": "밤",
			"Nightingale": "나이팅게일 가", "Outside": "외부", "Oxford": "옥스포드 가", "Park": "공원",
			"Parkcafe": "공원 카페", "Parkmens": "공원 남자 화장실", "Parktree": "공원 나무", "Parkwomens": "공원 여자 화장실",
			"Plains": "평원", "Prison": "교도소", "Promenade": "산책로", "Residential": "주거 지구", "Roof": "옥상",
			"Ruin": "폐허", "Schoolgrounds": "학교 부지", "Sea": "바다", "Seabeach": "바닷가", "Seacliffs": "해안 절벽",
			"Seadocks": "해안 부두", "Searocks": "해안 암초", "Sepulchre": "묘실", "Sewers": "하수도", "Skyscraper": "마천루",
			"Stables": "마구간", "Stand": "가판대", "Starfish": "스타피쉬 가", "Tentworld": "촉수 세계", "Tower": "탑",
			"Townhall": "시청", "Wolf": "울프 가", "Yard": "마당"
		};

		let output = "";
		if (fullMatch[eng]) {
			output = fullMatch[eng];
		} else {
			// 복합 명사 선 치환
			eng = eng.replace(/Stolen Goods/g, "장물")
			         .replace(/Sex Toys/g, "섹스 토이")
			         .replace(/Night Monster Lair/g, "밤의 괴물 소굴")
			         .replace(/Wolf Cave/g, "늑대 동굴")
			         .replace(/Alex Farm/g, "알렉스의 농장")
			         .replace(/Alex Cottage/g, "알렉스의 오두막")
			         .replace(/Alex Stables/g, "알렉스의 마구간")
			         .replace(/Police Station/g, "경찰서")
			         .replace(/Shopping Centre/g, "쇼핑센터")
			         .replace(/Pirate Ship/g, "해적선")
			         .replace(/Vending Machine/g, "자판기")
			         .replace(/Adult Shop/g, "성인용품점")
			         .replace(/Toy Shop/g, "장난감 가게")
			         .replace(/Pet Shop/g, "펫샵");

			// 띄어쓰기 기준으로 쪼개서 번역 후 합치기
			output = eng.split(" ").map(w => wordDict[w] !== undefined ? wordDict[w] : w).join(" ").replace(/\s+/g, " ").trim();
		}

		$(this.output).append(output);
	}
});