export const idlFactory = ({ IDL }) => {
  const PropertyId = IDL.Nat;
  const Property = IDL.Record({
    'id' : PropertyId,
    'propertyType' : IDL.Text,
    'size' : IDL.Float64,
    'description' : IDL.Opt(IDL.Text),
    'imageUrl' : IDL.Opt(IDL.Text),
    'price' : IDL.Float64,
    'location' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : Property, 'err' : IDL.Text });
  return IDL.Service({
    'createProperty' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Float64,
          IDL.Float64,
          IDL.Opt(IDL.Text),
          IDL.Opt(IDL.Text),
        ],
        [PropertyId],
        [],
      ),
    'getProperties' : IDL.Func([], [IDL.Vec(Property)], ['query']),
    'getProperty' : IDL.Func([PropertyId], [Result], ['query']),
    'searchProperties' : IDL.Func([IDL.Text], [IDL.Vec(Property)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
