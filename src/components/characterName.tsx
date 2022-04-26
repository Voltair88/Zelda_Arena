import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

// random name generator
const config: Config = {
  dictionaries: [names],
};

const characterName: string = uniqueNamesGenerator(config);

export default characterName;
