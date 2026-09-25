---
layout: post
title: "Expense: A Simple App for Everyday Spending"
subtitle: "Why I built my own expense tracker, and how I use AI and Shortcuts to make logging easier."
date: 2026-09-25
author: Winchell.Wang
header-img: "img/backgrounds/post-bg-tech.jpg"
tags:
    - Computer
    - Life Tips
header-mask: 0.2
catalog: true
mathjax: false
---

# Why I built Expense

For a long time, I used [Expense — Spending Tracking](https://apps.apple.com/ca/app/expense-spending-tracking/id1020335225) by Shan Cao. I really liked its simplicity. Open the app, enter an amount, choose a category, and get on with the day. That was exactly what I wanted from an expense tracker.

By the time I started this project, it had been more than two years since its last update. Meanwhile, iOS had changed quite a lot, and I began to miss a few things in my daily use: a dark mode experience that felt at home on my phone, iCloud backup, and integration with Apple Shortcuts.

I still liked the original design. So I decided to build my own app, taking inspiration from its simple layout and quick entry flow while adding the features I wanted for today's iPhone.

That became **Expense - Easy Cost Tracker**.

<a href="https://testflight.apple.com/join/Ea4FgKEF"><img src="https://raw.githubusercontent.com/WinchellWang/expense/main/icon/light_icon.png" width="128" height="128" alt="Expense App Icon" style="border-radius: 28px;">

<a href="https://testflight.apple.com/join/Ea4FgKEF"><img src="https://testflight.apple.com/images/testflight-iOS-400x400_1x_40.png" width="48" height="48" alt="Expense App Icon" style="border-radius: 28px;">Try Expense on TestFlight</a>

# Keeping it simple

The most important part of this project is restraint. Adding a feature is easy to justify individually, but enough additions can change the character of an app. I want **Expense** to remain something I can open, use in a few seconds, and close.

The improvements focus on everyday use:

- **Dark mode**, to make the app comfortable alongside the rest of iOS.
- **Optional iCloud backup**, to help preserve the records I have built up over time.
- **Apple Shortcuts support**, to make logging fit into existing routines, including Apple Pay automations.
- **Customizable categories**, with names and emoji that make sense to the person using them.
- **CSV and JSON export**, with JSON restore, so records can be saved and used elsewhere.

Manual entry stays straightforward: enter an amount and tap a category, with a note when needed. The app stores records locally, and iCloud is optional. There is no account to create and no bank login to connect.

# Built with the help of AI

I am grateful to be building this in a time when AI tools are available. They made it much easier to turn a small personal idea into a working app. The distance between “I wish this existed” and “I can make this for myself” feels much shorter now.

For me, the useful part is being able to spend more attention on how the app should feel: what should take one tap, which settings are actually useful, and when a feature adds more complexity than value.

Once the official version is available on the App Store, I will open-source the code on GitHub. I hope it will be useful to people who want a simple tracker, or who want to build their own version around different needs.

## Multilingual support

I also wanted to make Expense accessible to more people in their own language. The original app supports English and Simplified Chinese, and my version adds Traditional Chinese, Spanish, French, and Japanese, bringing the total to six languages. The app follows your system language, so more people can use it comfortably from the start.

# Apple Pay, Shortcuts, and AI

Shortcuts is one of the additions I wanted most. With a Transaction automation, an Apple Pay tap payment can pass its amount and merchant name to Expense's **Add Expense** action.

There is one complication: the transaction input does not provide the original Apple Pay category, even though the automation trigger lets you filter by category. A shortcut can receive the merchant and amount, but it cannot simply copy Apple's category into Expense.

There are three ways to handle this:

| Approach | How it works |
| --- | --- |
| Fixed categories | Create a separate automation for each selected transaction category and map it to an Expense category. |
| General first | Use Any Category and save everything as General, then sort the records later. |
| AI classification | Use Any Category and let an on-device model infer a category from the merchant name before saving. |

The AI option is a useful extension of the same simple workflow. It reduces the amount of manual sorting while leaving the main app focused on recording expenses.

# Set up automatic logging

You will need Expense, Apple's Shortcuts app, and Apple Pay configured on an iPhone running iOS 18 or later. For AI classification, you also need **iOS 26 or later on an Apple Intelligence-compatible iPhone**, with Apple Intelligence enabled and available for your language and region. See [Apple's setup guide](https://support.apple.com/en-ca/guide/iphone/iphc28624b81/ios) for device and availability requirements.

## Start with the basic automation

1. Open **Shortcuts → Automation**, tap **+**, and select **Transaction**. Depending on your iOS version, this may be labelled **Wallet**.
2. Choose **Any Card → Any Category → Any Merchant**. Select **Run Immediately** and turn off **Notify When Run** if you prefer quiet logging.
3. Create a blank automation. Add **Get Numbers from Input**, using the transaction's **Amount** property as input. This extracts the number from an amount that may contain a currency symbol.
4. Add Expense's **Add Expense** action. Set **Amount** to the **Numbers** output, **Category** to **General**, and **Note** to the transaction's **Merchant** property.
5. Expand the action's options and turn off **Show When Run**, if shown. Save the automation.

After your next Apple Pay tap payment, open Expense and check the amount and merchant note. Check decimal handling with your own currency and region settings as well.

For a fixed category instead, select a specific category in the trigger and choose the matching category in **Add Expense**. The screenshot below uses **Food & Drinks** as an example. Repeat this for other categories if you want separate mappings, keeping in mind that category filters can leave some payments uncovered.

![Example of a standard Apple Pay automation that saves an expense with a fixed category](https://github.com/WinchellWang/expense/raw/main/doc/shortcuts.jpg)

## Add AI classification

<a href="https://www.icloud.com/shortcuts/373d0c7f43aa49b6ae3eabe7dcd0c82d">
  <img src="https://cdn.jim-nielsen.com/ios/512/shortcuts-2018-10-03.png" alt="Add the AI shortcut" width="64" height="64">
</a>

[Download the AI shortcut](https://www.icloud.com/shortcuts/373d0c7f43aa49b6ae3eabe7dcd0c82d)

1. Open the link on your iPhone and add the shared shortcut to Shortcuts.
2. Create a **Transaction** automation with **Any Card → Any Category → Any Merchant**, and select **Run Immediately**.
3. Add **Run Shortcut** and select the imported shortcut. Pass the **Transaction / Shortcut Input** into it so it can read both **Amount** and **Merchant**.
4. Open the imported shortcut and check its **Use Model** action: choose **On-Device**, set **Output** to **Number**, and turn **Follow Up** off. Apple documents the available model options in its [Shortcuts guide](https://support.apple.com/guide/shortcuts/use-apple-intelligence-in-shortcuts-tpg3vrvwmclv/ios).
5. Check each numbered **If** branch. Its **Add Expense** action should receive the extracted amount, the matching Expense category, and the merchant as the note. Select your own categories where necessary and turn off **Show When Run**.
6. Disable the basic automation, and any other automation that records the same payments, before enabling this one. Otherwise, a payment may be recorded twice.

The sequence is: **receive the transaction → extract the amount → classify the merchant → save one expense**. Classification happens before saving.

## The classification prompt

The shortcut asks the model to return a single number corresponding to a category. Here is the prompt used in the guide:

```text
You are a transaction classification assistant.

Your task is to classify the given merchant/business name into exactly one of the following 8 categories:

1: Food & Drinks (e.g., restaurants, cafes, bars, supermarkets, food delivery)

2: Shopping (e.g., clothing, electronics, home goods, general retail)

3: Transportation (e.g., public transit, gas stations, ride-hailing/Uber/Lyft, tolls, parking)

4: Travel (e.g., airlines, hotels, Airbnb, car rentals, booking agencies)

5: Services (e.g., utilities, phone bills, insurance, subscriptions, repairs, professional services)

6: Entertainment (e.g., movies, streaming, gaming, concerts, museums, clubs)

7: Health (e.g., pharmacies, doctors, dentists, gyms, wellness)

8: General (other expense that is hard to classify into the above 7 categories)

Rules:
- Output ONLY the single category number (from 1 to 8).
- Do not include any explanations, punctuation, spaces, or extra text.

Here is Merchant Name: Transaction (Merchant)
```

Replace `Transaction (Merchant)` in the final line with the actual **Merchant** variable from the transaction input. Typing those words as plain text will not pass the merchant to the model.

The numbered branches map responses `1` through `8` to the corresponding Expense categories. Keep **General** as the fallback for uncertain classifications. The screenshot uses numbered branches: when adapting the shortcut, also route empty or unexpected responses to General so an unmatched response does not skip logging. Model execution failures may still require a manual entry.

![AI shortcut showing the merchant classification prompt and numbered category branches](https://github.com/WinchellWang/expense/raw/main/doc/iOS_27_AI_Shortcuts.jpg)

## What to check after setup

After your first payment, confirm that Expense contains exactly one entry with the correct amount, merchant, and a reasonable category.

AI is making an estimate from a merchant name. A supermarket purchase could be groceries or household supplies, and a merchant name alone cannot tell the difference. You can correct the category, amount, or note in Expense later. If model execution fails, you may need to add the expense manually.

This automation covers Apple Pay tap payments delivered to the Transaction trigger; it is not a complete bank transaction feed. Purchases outside that trigger still need another way of being recorded.

With **On-Device** selected, classification runs locally. Choosing a cloud model changes where that step is processed. Expense's optional iCloud backup is a separate setting.

# A small app I wanted to use

The original Expense showed me how pleasant a simple expense tracker could be, and I am thankful to its creator for that inspiration. My own version keeps that preference for simplicity while adding the integrations I missed.

Expense is currently available through [TestFlight](https://testflight.apple.com/join/Ea4FgKEF). If you try it, I would love to hear how it fits into your daily routine, especially whether the shortcut makes keeping track of spending a little easier.
