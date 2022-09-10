const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener("DOMContentLoaded", () => {
    const random = getRandomInt(1, 150);
    fetchData(random);
});

const fetchData = async (id) => {
    try{
        console.log(id);

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            id: data.id,
            hp: data.stats[0].base_stat,
            exp: data.base_experience,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            spAttack: data.stats[3].base_stat
        }

        pintarCard(pokemon)
    } catch (error) {
        console.log(error)
    }
}

const pintarCard = (pokemon) => {
    console.log(pokemon)
    
    const flex = document.querySelector(".flex")
    const template = document.getElementById("template-card").content
    const clone = template.cloneNode(true); //cuando hay varios que usan template
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute("src",pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span> #${pokemon.id} </span>`;
    clone.querySelector('.card-body-text').textContent = (pokemon.hp) + " HP";
    clone.querySelectorAll(".card-footer-social h3")[0].textContent = pokemon.attack;
    clone.querySelectorAll(".card-footer-social h3")[1].textContent = pokemon.defense;
    clone.querySelectorAll(".card-footer-social h3")[2].textContent = pokemon.spAttack;

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}
