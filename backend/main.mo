import Bool "mo:base/Bool";
import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Float "mo:base/Float";

actor {
  // Types
  type PropertyId = Nat;
  type Property = {
    id: PropertyId;
    propertyType: Text;
    location: Text;
    size: Float;
    price: Float;
    description: ?Text;
    imageUrl: ?Text;
  };

  // Stable variable for upgrades
  stable var nextPropertyId: Nat = 0;
  stable var propertyEntries: [(PropertyId, Property)] = [];

  // Mutable state
  var properties = HashMap.HashMap<PropertyId, Property>(10, Nat.equal, Nat.hash);

  // Initialize properties from stable storage
  system func preupgrade() {
    propertyEntries := Iter.toArray(properties.entries());
  };

  system func postupgrade() {
    properties := HashMap.fromIter<PropertyId, Property>(propertyEntries.vals(), 10, Nat.equal, Nat.hash);
  };

  // Helper function to create a new property ID
  func generatePropertyId(): PropertyId {
    let id = nextPropertyId;
    nextPropertyId += 1;
    id
  };

  // Create a new property listing
  public func createProperty(propertyType: Text, location: Text, size: Float, price: Float, description: ?Text, imageUrl: ?Text): async PropertyId {
    let id = generatePropertyId();
    let newProperty: Property = {
      id;
      propertyType;
      location;
      size;
      price;
      description;
      imageUrl;
    };
    properties.put(id, newProperty);
    id
  };

  // Get all properties
  public query func getProperties(): async [Property] {
    Iter.toArray(properties.vals())
  };

  // Get a specific property
  public query func getProperty(id: PropertyId): async Result.Result<Property, Text> {
    switch (properties.get(id)) {
      case (null) { #err("Property not found") };
      case (?property) { #ok(property) };
    }
  };

  // Search properties
  public query func searchProperties(searchTerm: Text): async [Property] {
    let searchTermLower = Text.toLowercase(searchTerm);
    Array.filter<Property>(Iter.toArray(properties.vals()), func (p: Property): Bool {
      Text.contains(Text.toLowercase(p.propertyType), #text searchTermLower) or
      Text.contains(Text.toLowercase(p.location), #text searchTermLower)
    })
  };
}
