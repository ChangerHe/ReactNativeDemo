/**
 * @flow
 * @relayHash d1f7b51cfc6f9fe392e405fc2f8b3967
 */

/* eslint-disable */

"use strict";

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type F8DemosViewQueryResponse = {|
  +demos: ?$ReadOnlyArray<?{|
    +title: ?string;
    +description: ?string;
    +booking: ?string;
    +location: ?string;
    +links: ?$ReadOnlyArray<?{|
      +title: ?string;
      +url: ?string;
    |}>;
    +logo: ?string;
    +logoHeight: ?number;
    +logoWidth: ?number;
    +devGarage: ?boolean;
  |}>;
|};
*/

/*
query F8DemosViewQuery {
  demos {
    title
    description
    booking
    location
    links {
      title
      url
    }
    logo
    logoHeight
    logoWidth
    devGarage
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  fragment: {
    argumentDefinitions: [],
    kind: "Fragment",
    metadata: null,
    name: "F8DemosViewQuery",
    selections: [
      {
        kind: "LinkedField",
        alias: null,
        args: null,
        concreteType: "Demo",
        name: "demos",
        plural: true,
        selections: [
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "title",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "description",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "booking",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "location",
            storageKey: null
          },
          {
            kind: "LinkedField",
            alias: null,
            args: null,
            concreteType: "DemoLink",
            name: "links",
            plural: true,
            selections: [
              {
                kind: "ScalarField",
                alias: null,
                args: null,
                name: "title",
                storageKey: null
              },
              {
                kind: "ScalarField",
                alias: null,
                args: null,
                name: "url",
                storageKey: null
              }
            ],
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "logo",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "logoHeight",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "logoWidth",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "devGarage",
            storageKey: null
          }
        ],
        storageKey: null
      }
    ],
    type: "Query"
  },
  id: null,
  kind: "Batch",
  metadata: {},
  name: "F8DemosViewQuery",
  query: {
    argumentDefinitions: [],
    kind: "Root",
    name: "F8DemosViewQuery",
    operation: "query",
    selections: [
      {
        kind: "LinkedField",
        alias: null,
        args: null,
        concreteType: "Demo",
        name: "demos",
        plural: true,
        selections: [
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "title",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "description",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "booking",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "location",
            storageKey: null
          },
          {
            kind: "LinkedField",
            alias: null,
            args: null,
            concreteType: "DemoLink",
            name: "links",
            plural: true,
            selections: [
              {
                kind: "ScalarField",
                alias: null,
                args: null,
                name: "title",
                storageKey: null
              },
              {
                kind: "ScalarField",
                alias: null,
                args: null,
                name: "url",
                storageKey: null
              }
            ],
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "logo",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "logoHeight",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "logoWidth",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "devGarage",
            storageKey: null
          },
          {
            kind: "ScalarField",
            alias: null,
            args: null,
            name: "id",
            storageKey: null
          }
        ],
        storageKey: null
      }
    ]
  },
  text:
    "query F8DemosViewQuery {\n  demos {\n    title\n    description\n    booking\n    location\n    links {\n      title\n      url\n    }\n    logo\n    logoHeight\n    logoWidth\n    devGarage\n    id\n  }\n}\n"
};

module.exports = batch;
