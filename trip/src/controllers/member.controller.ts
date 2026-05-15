import { Response } from "express";
import { AuthRequest } from "../middlewares/protect.js";
import * as memberService from "../services/member.service.js";

export const addMember = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.body;
    const tripId = req.params.id as string;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const member = await memberService.addMember(tripId, userId);

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        message: "User is already a member of this trip",
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || "Failed to add member",
    });
  }
};

export const getMembers = async (req: AuthRequest, res: Response) => {
  try {
    const tripId = req.params.id as string;
    const members = await memberService.getMembers(tripId);

    res.status(200).json({
      success: true,
      data: members,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to get members",
    });
  }
};

export const removeMember = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const tripId = req.params.id as string;

    await memberService.removeMember(tripId, userId as string);

    res.status(200).json({
      success: true,
      message: "Member removed successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to remove member",
    });
  }
};
