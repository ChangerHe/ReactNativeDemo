/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @flow
 */

import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import { globalIdField } from "graphql-relay";
import Parse from "parse/node";

import typeRegistry from "./typeRegistry";

const Demo = Parse.Object.extend("Demo");

const demoLinkType = new GraphQLObjectType({
  name: "DemoLink",
  fields: () => ({
    title: {
      type: GraphQLString,
      resolve: link => link.title
    },
    url: {
      type: GraphQLString,
      resolve: link => link.url
    }
  })
});

const demoType = new GraphQLObjectType({
  name: "Demo",
  fields: () => ({
    id: globalIdField(),
    title: {
      type: GraphQLString,
      resolve: demo => demo.get("title")
    },
    description: {
      type: GraphQLString,
      resolve: demo => demo.get("description")
    },
    booking: {
      type: GraphQLString,
      resolve: demo => demo.get("booking")
    },
    location: {
      type: GraphQLString,
      resolve: demo => demo.get("location")
    },
    links: {
      type: new GraphQLList(demoLinkType),
      resolve: demo => demo.get("links")
    },
    logo: {
      type: GraphQLString,
      resolve: demo => demo.get("logo") && demo.get("logo").url()
    },
    logoHeight: {
      type: GraphQLInt,
      resolve: demo => demo.get("logoHeight")
    },
    logoWidth: {
      type: GraphQLInt,
      resolve: demo => demo.get("logoWidth")
    },
    devGarage: {
      type: GraphQLBoolean,
      resolve: demo => demo.get("devGarage")
    }
  }),
  interfaces: () => [require("./node").nodeInterface]
});
typeRegistry.register(demoType);

const demosField = {
  type: new GraphQLList(demoType),
  resolve: () => new Parse.Query(Demo).find()
};

export { demosField };
