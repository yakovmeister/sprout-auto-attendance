import Event from 'aws-sdk/clients/eventbridge';

const events = new Event();

const fetchScheds = async () => {
  const rules = await events.listRules().promise();

  return rules.Rules;
};

export default fetchScheds;
