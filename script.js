const	SECRET = "MossaJehad";

function	encrypt(str) {
	return (CryptoJS.AES.encrypt(str, SECRET).toString());
}

function	decrypt(str) {
	try {
		return (CryptoJS.AES.decrypt(str, SECRET).toString(CryptoJS.enc.Utf8));
	} catch (e) {
		return (null);
	}
}

const	levelNumber = {
	easy: 1,
	medium: 2,
	hard: 3
};

const	arrayImage = ["https://cdn-icons-png.flaticon.com/512/174/174854.png",
					"https://cdn-icons-png.flaticon.com/512/732/732190.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968292.png",
					"https://cdn-icons-png.flaticon.com/512/875/875209.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968332.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968282.png",
					"https://cdn-icons-png.flaticon.com/512/3541/3541190.png",
					"https://cdn-icons-png.flaticon.com/512/6132/6132222.png",
					"https://cdn-icons-png.flaticon.com/512/6132/6132221.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968350.png",
					"https://cdn-icons-png.flaticon.com/512/15465/15465695.png",
					"https://cdn-icons-png.flaticon.com/512/15466/15466163.png",
					"https://cdn-icons-png.flaticon.com/512/733/733609.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968381.png",
					"https://cdn-icons-png.flaticon.com/512/18405/18405232.png",
					"https://cdn-icons-png.flaticon.com/512/15713/15713436.png",
					"https://cdn-icons-png.flaticon.com/512/919/919842.png",
					"https://cdn-icons-png.flaticon.com/512/6132/6132220.png",
					"https://cdn-icons-png.flaticon.com/512/14090/14090833.png",
					"https://cdn-icons-png.flaticon.com/512/226/226770.png",
					"https://cdn-icons-png.flaticon.com/512/731/731985.png",
					"https://cdn-icons-png.flaticon.com/512/732/732250.png",
					"https://cdn-icons-png.flaticon.com/512/882/882730.png",
					"https://cdn-icons-png.flaticon.com/512/10769/10769428.png",
					"https://cdn-icons-png.flaticon.com/512/3800/3800024.png",
					"https://cdn-icons-png.flaticon.com/512/174/174874.png",
					"https://cdn-icons-png.flaticon.com/512/3536/3536505.png",
					"https://cdn-icons-png.flaticon.com/512/2103/2103665.png",
					"https://cdn-icons-png.flaticon.com/512/8760/8760206.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968252.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968259.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968358.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968342.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968304.png",
					"https://cdn-icons-png.flaticon.com/512/5968/5968534.png",
					"https://cdn-icons-png.flaticon.com/512/3669/3669986.png",
					"https://cdn-icons-png.flaticon.com/512/3813/3813611.png",
					"https://cdn-icons-png.flaticon.com/512/17349/17349599.png"
];

function	shuffled(arr) {
	return ([...arr].sort(() => Math.random() - 0.5));
}

function	hideCards() {
	const	defaultCard = "https://i.ibb.co/5gYHnMFg/42-design-1.png";
	let		imgs = document.querySelectorAll(".main img.card");
	imgs.forEach(img => {
		img.src = defaultCard;
	});
}

function	flipCard(imgEl) {
	const	enc = imgEl.dataset.face;
	if (!enc)
		return ;
	const	url = decrypt(enc);
	if (url)
		imgEl.src = url;
	else
		console.warn("Failed to decrypt face for card");
}

function	putImage(num) {
	const	main = document.querySelector(".main");
	const	total = num * num;
	const	needCount = total / 2;
	main.innerHTML = "";

	const pool = shuffled(arrayImage).slice(0, Math.min(needCount, arrayImage.length));
	while (pool.length < needCount)
		pool.push(...arrayImage.slice(0, Math.min(arrayImage.length, needCount - pool.length)));

	let	arr = [...pool, ...pool];
	arr = shuffled(arr);
	arr.forEach((faceUrl, idx) => {
		const elm = document.createElement("img");
		elm.classList.add("card");
		elm.src = faceUrl;
		elm.width = 50;
		elm.style.height = "auto";
		elm.style.borderRadius = "10px";
		elm.style.cursor = "pointer";
		elm.dataset.face = encrypt(faceUrl);
		elm.dataset.index = String(idx);
		elm.addEventListener("click", () => {
		const backUrl = "https://i.ibb.co/5gYHnMFg/42-design-1.png";
		if (elm.src === backUrl)
			flipCard(elm);
		else
			elm.src = backUrl;
		});
		main.appendChild(elm);
	});

	let	time = 1000;
	if (num < 6)
		time *= 1;
	else if (num == 6)
		time *= 2;
	else
		time *= 4;
	setTimeout(() => {
		hideCards();
	}, time);
}

function	prepare(num) {
	const	cards = num * num;
	const	side = Math.sqrt(cards);

	document.documentElement.style.setProperty("--level", side - 1);
	putImage(num);
}

function	create(levelNum) {
	if (levelNum == 1)
		return (prepare(4));
	if (levelNum == 2)
		return (prepare(6));
	if (levelNum == 3)
		return (prepare(8));
}

function	handleLevel(id) {
	create(levelNumber[id]);
}
