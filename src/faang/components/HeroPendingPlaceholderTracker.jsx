/**
 * @fileoverview
 * Copyright (c) Xuan Tien and affiliated entities.
 * All rights reserved. This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory for details.
 */
const interactions = new Map();

export function addInteraction(id) {
  if (!interactions.has(id)) {
    interactions.set(id, new Map());
  }
}

// eslint-disable-next-line max-params
export function addPlaceholder(
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

export function dump(interactionId) {
  const interaction = interactions.get(interactionId);
  return interaction ? Array.from(interaction.values()) : [];
}

export function removeInteraction(interactionId) {
  interactions.delete(interactionId);
}

export function removePlaceholder(interactionId, placeholderId) {
  const interaction = interactions.get(interactionId);
  if (interaction) {
    interaction.delete(placeholderId);
  }
}

export function isInteractionActive(interactionId) {
  return interactions.has(interactionId);
}
