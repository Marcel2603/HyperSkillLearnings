const input = require('sync-input');
let water = 400;
let milk = 540;
let beans = 120;
let sugar = 100;
let cups = 9;
let money = 550;

const recipes = new Map([
	[1, {name: "espresso", water: 250, milk: 0, beans: 16, sugar: 0, money: 4}],
	[2, {name: "latte", water: 350, milk: 75, beans: 20, sugar: 0, money: 7}],
	[3, {name: "cappuccino", water: 200, milk: 100, beans: 12, sugar: 0, money: 6}]
]);

function printState() {
	console.log(`The coffee machine has:
${water} ml of water
${milk} ml of milk
${beans} g of coffee beans
${sugar} g of sugar
${cups} disposable cups
$${money} of money`);
}

function fillMachine() {
	const addedWater = Number(input("Write how many ml of water you want to add: "));
	const addedMilk = Number(input("Write how many ml of milk you want to add: "));
	const addedBeans = Number(input("Write how many grams of coffee beans you want to add: "));
	const addedSugar = Number(input("Write how many grams of sugar you want to add: "));
	const addedCups = Number(input("Write how many disposable coffee cups you want to add: "));
	water += addedWater;
	milk += addedMilk;
	beans += addedBeans;
	sugar += addedSugar;
	cups += addedCups;
}

function calculateResources(recipe) {
	switch (true) {
		case water < recipe.water:
			return "Sorry, not enough water!";
		case milk < recipe.milk:
			return "Sorry, not enough milk!";
		case beans < recipe.beans:
			return "Sorry, not enough coffee beans!";
		case sugar < recipe.sugar:
			return "Sorry, not enough sugar!";
		case cups < 1:
			return "Sorry, not enough cups!";
	}
}

function buyCoffee() {
	console.log("What do you want to buy?");
	let recipesStr = [...recipes.entries()]
		.map(([key, value]) => {
			return `${key} - ${value.name}`;
		})
		.join(", ");
	const coffeeInput = input(`${recipesStr}, back - to main menu: `);
	if (coffeeInput === "back") {
		return;
	}
	const recipe = recipes.get(Number(coffeeInput));
	let resources = calculateResources(recipe);
	if (resources) {
		console.log(resources);
		return;
	}
	water -= recipe.water;
	milk -= recipe.milk;
	beans -= recipe.beans;
	sugar -= recipe.sugar;
	cups -= 1;
	money += recipe.money;
	console.log(`Here your ${recipe.name}`);
}

function addRecipe() {
	console.log("Let's add a new coffee!");
	const name = input("How is the coffee called? ");
	const waterNeeded = Number(input("Write how many ml of water it needs: "));
	const milkNeeded = Number(input("Write how many ml of milk it needs: "));
	const beansNeeded = Number(input("Write how many grams of coffee beans it needs: "));
	const sugarNeeded = Number(input("Write how many grams of sugar it needs: "));
	const moneyNeeded = Number(input("Write how expensive the coffee is (at least $1): "));
	if (moneyNeeded < 1) {
		console.log("We need to make profit!");
		return;
	}
	const id = recipes.size + 1;
	recipes.set(id, {
		name: name,
		water: waterNeeded,
		milk: milkNeeded,
		beans: beansNeeded,
		sugar: sugarNeeded,
		money: moneyNeeded
	});
	console.log(`Recipe added. Try it out (Option ${id})`);
}

function main() {
	const action = input("Write action (add, buy, fill, take, remaining, exit): ");
	let exit = false;
	switch (action) {
		case "add":
			addRecipe();
			break;
		case "buy":
			buyCoffee();
			break;
		case "fill":
			fillMachine();
			break;
		case "take":
			console.log(`I gave you $${money}`);
			money = 0;
			break;
		case "remaining":
			printState();
			break;
		case "exit":
			exit = true;
			break;
	}
	return exit;
}

let run = true;
do {
	run = !main();
} while (run);
