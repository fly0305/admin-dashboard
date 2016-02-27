/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me: require('./queries/me').default,
      content: require('./queries/content').default,
    },
  }),
});

export default schema;
