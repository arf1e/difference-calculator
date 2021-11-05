import yaml from 'js-yaml';

const PARSERS_MAPPER = {
  '.json': JSON.parse,
  '.yml': yaml.load,
};

const getParserByExtension = (ext) => PARSERS_MAPPER[ext] || JSON.parse;

export default getParserByExtension;
