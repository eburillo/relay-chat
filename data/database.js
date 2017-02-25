/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

// Model types
class User {}
class Entry {}

// Mock data
var viewer = new User();
viewer.id = '1';
viewer.name = 'Anonymous';
viewer.avatar = "ballmer.png";
const entries = [];
const entriesById = {};
let nextEntryId = 0;
let fakeDateIncremental = 100000000;
let fakeDateValue = Date.now() - fakeDateIncremental * 3;
['Prepare some dinner', 'Go to the post office', 'Speak with Trevor'].map((text, i) => {
  addEntry(text, fakeDateValue);
  fakeDateValue += fakeDateIncremental;
});

function addEntry(text, date = Date.now()) {
  const entry = new Entry();
  entry.id = nextEntryId++;
  entry.text = text;
  entry.date = date;
  entriesById[entry.id] = entry;
  entries.push(entry.id);
  return entry;
}

function editEntry(id, text) {
  const entry = getEntry(id);
  entry.text = text;
  entry.date = Date.now();
  return entry;
}

function removeEntry(id) {
  const entryIndex = entries.indexOf(id);
  if (entryIndex !== -1) {
    entries.splice(entryIndex, 1);
  }
  delete entriesById[id];
}

function getEntries() {
  return entries.map(id => entriesById[id]);
}

function getEntry(id) {
  return entriesById[id];
}

module.exports = {
  // Export methods that your schema can use to interact with your database
  getUser: (id) => id === viewer.id ? viewer : null,
  getViewer: () => viewer,
  getEntry: getEntry,
  getEntries: getEntries,
  User,
  Entry,
  addEntry: addEntry,
  editEntry: editEntry,
  removeEntry: removeEntry
};
