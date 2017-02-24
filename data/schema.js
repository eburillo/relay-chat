/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
  cursorForObjectInConnection,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  User,
  Entry,
  getUser,
  getViewer,
  getEntry,
  getEntries,
  addEntry,
  editEntry,
  removeEntry,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Entry') {
      return getEntry(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Entry)  {
      return entryType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var userType = new GraphQLObjectType({
  name: 'User',
  description: 'A person who uses our app',
  fields: () => ({
    id: globalIdField('User'),
    avatar: {
      type: GraphQLString,
      description: 'The avatar of the user',
    },
    entryConnection: {
      type: entryConnection.connectionType,
      args: connectionArgs,
      description: 'A person\'s collection of entries',
      resolve: (_, args) => connectionFromArray(
        getEntries(),
        args
      ),
    },
    totalCount: {
      type: GraphQLInt,
      resolve: () => getEntries().length,
    },
  }),
  interfaces: [nodeInterface],
});

var entryType = new GraphQLObjectType({
  name: 'Entry',
  description: 'A shiny entry',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj.id
    },
    text: {
      type: GraphQLString,
      description: 'The text of the entry',
    },
    date: {
      type: GraphQLFloat,
      description: 'The date of the entry'
    }
  }),
  interfaces: [nodeInterface],
});

/**
 * Define your own connection types here
 */

let entryConnection = connectionDefinitions({
  name: 'Entry',
  nodeType: entryType
})

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    // Add your own root fields here
    viewer: {
      type: userType,
      resolve: () => getViewer(),
    },
  }),
});

const addEntryMutation = mutationWithClientMutationId({
  name: 'AddEntry',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
  },
  outputFields: {
    entryEdge: {
      type: entryConnection.edgeType,
      resolve: (entry) => {
        return {
          cursor: entry.id,
          node: entry,
        };
      }
    },
    viewer: {
      type: userType,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: ({text}) => {
    const newEntry = addEntry(text);
    return newEntry;
  },
});

const editEntryMutation = mutationWithClientMutationId({
  name: 'EditEntry',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    text: { type: new GraphQLNonNull(GraphQLString)},
  },
  outputFields: {
    entry: {
      type: entryType,
      resolve: (id) => getEntry(id),
    },
  },
  mutateAndGetPayload: (id, text) => {
    console.log("ID", id);
    console.log("TEXT", text);
    const entryId = fromGlobalId(id).id;
    editEntry(entryId, text);
    return entryId;
  },
});

const removeEntryMutation = mutationWithClientMutationId({
  name: 'RemoveEntry',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    deletedEntryId: {
      type: GraphQLID,
      resolve: ({id}) => id,
    },
    viewer: {
      type: userType,
      resolve: () => getViewer()
    }
  },
  mutateAndGetPayload: (obj) => {
    const removedId = parseInt(obj.id);
    removeEntry(removedId);
    return obj;
  },
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addEntry: addEntryMutation,
    editEntry: editEntryMutation,
    removeEntry: removeEntryMutation
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export var Schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});
