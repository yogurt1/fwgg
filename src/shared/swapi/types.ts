export interface FilmResourceDto {
    characters: string[] | PeopleResourceDto[];
    created: string;
    director: string;
    edited: string;
    episode_id: string;
    opening_crawl: string;
    planets: string[] | PlanetResourceDto[];
    producer: string;
    release_date: string;
    species: string[] | SpecieResource[];
    starships: string[] | StartshipResourceDto[];
    title: string;
    url: string;
    vehicles: string[] | VehicleResourceDto[];
  }
  export interface PeopleResourceDto {
    birth_year: string;
    eye_color: string;
    films: string[] | FilmResourceDto[];
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string | PlanetResourceDto;
    mass: string;
    name: string;
    skin_color: string;
    created: string;
    edited: string;
    species: string[] | SpecieResource[];
    starships: string[] | StartshipResourceDto[];
    url: string;
    vehicles: string[] | VehicleResourceDto[];
  }
  export interface PlanetResourceDto {
    climate: string;
    created: string;
    diameter: string;
    edited: string;
    films: string[] | FilmResourceDto[];
    gravity: string;
    name: string;
    orbital_period: string;
    population: string;
    residents: string[] | PeopleResourceDto[];
    rotation_period: string;
    surface_water: string;
    terrain: string;
    url: string;
  }
  export interface SpecieResource {
    average_height: string;
    average_lifespan: string;
    classification: string;
    created: string;
    designation: string;
    edited: string;
    eye_colors: string;
    hair_colors: string;
    homeworld: string | PlanetResourceDto;
    language: string;
    name: string;
    people: string[] | PeopleResourceDto[];
    films: string[] | FilmResourceDto[];
    skin_colors: string;
    url: string;
  }
  export interface StartshipResourceDto {
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: string;
    crew: string;
    edited: string;
    hyperdrive_rating: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    films: string[] | FilmResourceDto[];
    pilots: string[] | PeopleResourceDto[];
    starship_class: string;
    url: string;
  }
  export interface VehicleResourceDto {
    cargo_capacity: string;
    consumables: string;
    cost_in_credits: string;
    created: string;
    crew: string;
    edited: string;
    length: string;
    manufacturer: string;
    max_atmosphering_speed: string;
    model: string;
    name: string;
    passengers: string;
    pilots: string[] | PeopleResourceDto[];
    films: string[] | FilmResourceDto[];
    url: string;
    vehicle_class: string;
  }