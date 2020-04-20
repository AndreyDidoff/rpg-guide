// Requires
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
// Controllers
const others = require("../controllers/others");
// Variables
const routes_others = express.Router();
/*
 * others
 */
// Create New Alignment
routes_others.post(
  "/alignment",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_alignments
);
// Select All Alignments
routes_others.get(
  "/alignment",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_alignments
);
// Create New Class
routes_others.post(
  "/class",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      dice_life: Joi.integer().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_class
);
// Select Class Using id
routes_others.get(
  "/class/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  others.select_class_id
);
// Select All Classes
routes_others.get(
  "/class",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_classes
);

// Create New Color Eye
routes_others.post(
  "/color_eye",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_color_eye
);
// Select All Colors Eye
routes_others.get(
  "/color_eye",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_color_eye
);
// Create New Color Hair
routes_others.post(
  "/color_hair",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_color_hair
);
// Select All Colors Hair
routes_others.get(
  "/color_hair",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_color_hair
);
// Create New Color Skin
routes_others.post(
  "/color_skin",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_color_skin
);
// Select All Colors Skin
routes_others.get(
  "/color_skin",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_color_skin
);
// Create New Language
routes_others.post(
  "/language",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_language
);
// Select All Languages
routes_others.get(
  "/language",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_languages
);
// Create New Magic
routes_others.post(
  "/magic",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      circle: Joi.string().required(),
      level: Joi.integer().required(),
      formulation_time: Joi.string().required(),
      duraction: Joi.string().required(),
      reach: Joi.string().required(),
      target: Joi.string().required(),
      resistance: Joi.string().required(),
      description: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_magic
);
// Select Magic Using id
routes_others.get(
  "/magic/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  others.select_magic_id
);
// Select All Magics
routes_others.get(
  "/magic",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_magics
);
// Create New Money
routes_others.post(
  "/money",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      initials: Joi.string().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_money
);
// Select Money Using id
routes_others.get(
  "/money/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  others.select_money_id
);
// Select All Moneys
routes_others.get(
  "/money",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_money
);
// Create New Race
routes_others.post(
  "/race",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      level: Joi.integer(),
      force_add: Joi.integer(),
      dexterity_add: Joi.integer(),
      constitution_add: Joi.integer(),
      intelligence_add: Joi.integer(),
      wisdom_add: Joi.integer(),
      charisma_add: Joi.integer(),
      displacement: Joi.integer(),
      min_age: Joi.integer(),
      max_age: Joi.integer(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_race
);
// Select Money Using id
routes_others.get(
  "/race/:id",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  others.select_race_id
);
// Select All Moneys
routes_others.get(
  "/race",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_races
);
// Select Cross Race Languages
routes_others.get(
  "/race_languages",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      id_race: Joi.number().required(),
    }),
  }),
  others.select_cross_race_languages
);
// Create New Size
routes_others.post(
  "/size",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      height: Joi.integer(),
      width: Joi.integer(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.create_size
);
// Select All Sizes
routes_others.get(
  "/size",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  others.select_all_sizes
);

// Export routes_others
module.exports = routes_others;