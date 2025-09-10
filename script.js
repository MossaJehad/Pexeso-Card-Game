const levelNumber = ({
	easy: 1,
	medium: 2,
	hard: 3
})

const arrayImage = ["https://cdn-icons-png.flaticon.com/512/174/174854.png",
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
					"https://cdn-icons-png.flaticon.com/512/882/882730.png"
];

function prepare(num)
{
	let arr = [];
	let used = new Set();

	while (num > 0) {
		let randomNum = Math.floor(Math.random() * arrayImage.length);
		if (!used.has(randomNum)) {
			used.add(randomNum);
			arr.push(arrayImage[randomNum]);
			num--;
		}
	}
	return(arr);
}

function getImage(levelNum)
{
	if(levelNum == 1)
		return(prepare(4));
	if(levelNum == 2)
		return(prepare(8));
	if(levelNum == 3)
		return(prepare(16));
}

function create(levelNum)
{
	let main = document.querySelector('.main');
	while(levelNum)
	{
		let newElem = document.createElement("div");
		main.appendChild(newElem)
		const content = getImage(levelNum);
		newElem.appendChild("<img src=''");
		levelNum--;
	}
}

function handleLevel(id)
{
	create(levelNumber[id])
}