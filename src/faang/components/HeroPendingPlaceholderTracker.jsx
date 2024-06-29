/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const interactions = new Map();

function addInteraction(id) {
  if (!interactions.has(id)) {
    interactions.set(id, new Map());
  }
}

// eslint-disable-next-line max-params
function addPlaceholder(
  interactionId,
  placeholderId,
  description,
  startTime,
  pageletStack
) {
  const interaction = interactions.get(interactionId);
  if (interaction) {
    interaction.set(placeholderId, { description, startTime, pageletStack });
  }
}

function dump(interactionId) {
  const interaction = interactions.get(interactionId);
  return interaction ? Array.from(interaction.values()) : [];
}

function removeInteraction(interactionId) {
  interactions.delete(interactionId);
}

function removePlaceholder(interactionId, placeholderId) {
  const interaction = interactions.get(interactionId);
  if (interaction) {
    interaction.delete(placeholderId);
  }
}

function isInteractionActive(interactionId) {
  return interactions.has(interactionId);
}

export {
  addInteraction,
  addPlaceholder,
  dump,
  isInteractionActive,
  removeInteraction,
  removePlaceholder,
};
