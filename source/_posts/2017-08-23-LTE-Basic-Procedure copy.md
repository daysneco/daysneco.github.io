---
title: LTE Basic Procedure
date: 2017-08-24 15:35:39
tags: LTE
---

- UE is Off
- Power On UE
- < Frequency Search > <!-- more -->
- < Timing Sync >
- < Cell Search > : Normally a UE would find multiple cells in this process
- < Cell Selection >
- MIB decoding
- SIB decoding
- < Initial RACH Process >
- < Registration/Authentication/Attach>
- < Default EPS Bearer Setup >
- Now UE is in IDLE Mode
- <(If the cursrent cell become weak or UE moves to another cell register) Cell Reselection>
- <(When Paging message comes or User make a call) RACH Process>
- < Setup Dedicated EPS Bearer >
- Receive data
- Transmit data
- (If UE power is percieved too weak by the network) Network send TPC command to increase UE Tx Power
- (If UE power is percieved too strong by the network) Network send TPC command to decrease UE Tx Power
- (If UE moves to another cell region) Network and UE perform Handover procedure >User stop call and UE gets into IDLE mode
